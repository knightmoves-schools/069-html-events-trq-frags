const http = require("http");
const fs = require("fs");
const puppeteer = require("puppeteer");
const { assert } = require("console");

let server;
let browser;
let page;

beforeAll(async () => {
  server = http.createServer(function (req, res) {
    fs.readFile(__dirname + "/.." + req.url, function (err, data) {
      if (err) {
        res.writeHead(404);
        res.end(JSON.stringify(err));
        return;
      }
      res.writeHead(200);
      res.end(data);
    });
  });

  server.listen(process.env.PORT || 3000);
});

afterAll(() => {
  server.close();
});

beforeEach(async () => {
  browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  page = await browser.newPage();
  await page.goto("http://localhost:3000/index.html");
});

afterEach(async () => {
  await browser.close();
});

describe('the index.js file', () => {
  it('should multiply the input with the id `number` with itself and display the squared value in the div with the id `result`', async function () {
    const result = await page.evaluate(() => {
      document.getElementById('number').value = '5';
      document.getElementById('calculate').click();
      return document.getElementById('result').innerHTML;
    });  

    expect(result).toBe('25');
  });

  it('should display "Invalid, please enter a number" in the div with the id `result` when the input is not a number.', async function () {
    const result = await page.evaluate(() => {
      document.getElementById('number').value = 'BAD';
      document.getElementById('calculate').click();
      return document.getElementById('result').innerHTML;
    });    

    expect(result).toBe('Invalid, please enter a number');
  });
});

