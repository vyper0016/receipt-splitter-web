# Receipt splitter

## Description
This is my first try making a web app. It is a very simple app that allows partners to split grocery bills.
Built using Flask. Currently only tested on windows, using python 3.11
### How it works
It allows a user to upload receipts from different supermarkets and uses an OCR API (currently using an unlicensed version of veryfi) to read data from it and return it in a table and tells the user who should pay who and how much.
### Features
- Each user has a seperate session so data from different users doesn't interfere
- Real-time progressbar that gives feedback about the current state of the server response
- Ability to change the prices and get real-time calculations to account for OCR errors
- Ability to zoom in on receipt pictures on pointer hover
- simple interface for ease of use and future upgrades

## Demo
### Note
This is still a work in progress and as of now is more of a prrof of concept. The partner names are currently set to "A" and "O", that will probably change in the future as I implement user account.

---
- First you upload your receipts:

![Opera Snapshot_2023-07-14_014412_127 0 0 1](https://github.com/vyper0016/receipt-splitter-web/assets/81050283/224a08e0-af24-4f98-9827-c4356eb7c11d)
![Opera Snapshot_2023-07-14_014454_127 0 0 1](https://github.com/vyper0016/receipt-splitter-web/assets/81050283/66ac3021-addd-4367-b37e-d6d00044cd81)

- Then you wait for the progressbar

![Opera Snapshot_2023-07-14_014519_127 0 0 1](https://github.com/vyper0016/receipt-splitter-web/assets/81050283/3a23285c-82fb-42ee-82cc-3c1833569603)

- After that you will be automatically redirected to the prices table.

![Opera Snapshot_2023-07-14_015721_127 0 0 1](https://github.com/vyper0016/receipt-splitter-web/assets/81050283/5ea965ac-0117-4178-bce7-0d4e8dba0085)

---

### Table's contents
- On the left side:
  You can see the supermarket name, logo, address and a zoomable image of the uploaded receipt.
  And more importantly, choose who paid for the specific receipt.
- For each item:
  You can see the quantity of the item, the unit price, Description, Total price for the item and allows you to choose who the item is for by choosing the name of the partner or "B" to split it 50/50
- Under each receipt:
  You can see a Sub-Total (the total price on the specific receipt) to verify with the actual picture as a way to confirm there were no errors in the OCR or in the prices.
- At the bottom of the table:
  You can see 3 different rows:
  1. The total paid by partner 1
  2. The total paid by partner 2
  3. The resolution:
      Who pays who and how much.

## How to try it
### Note
Note that you cannot currently try this to its full functionality unless you have a veryfi account with an active api key and credentials

---
1. Clone the repository
2. Edit the `api_keys.py` file and add in your api keys from [the veryfi website](https://app.veryfi.com/api/settings/keys/)
3. Launch `app.py` and wait for an address you can visit.
   
   ![Capture](https://github.com/vyper0016/receipt-splitter-web/assets/81050283/d1cc1a92-4251-4f98-8175-7cf204b30d23)

   
5. If you want to make it visible for other devices in the network, edit the last line of the `app.py` file and add `host='0.0.0.0'` in the app.run arguments
   make sure to disable debugging if you're not on a trusted network.
   It should now look like this:
   `app.run(host='0.0.0.0')`
   Note that the website is currently not optimized for phones but will function normally anyways, even if it looks a bit janky.

## Future Improvements
As mentioned above this is a proof of concept and my first shot at web based development in general, if i decide to improve on this I'd like to implement the following features:
- User Accounts to keep track of user data like partner names and save old receipts if needed
- Front-end improvements
- Implementation of a better, easier to maintain and scale OCR service
- Probably use django or an actual back-end platform like a normal person
