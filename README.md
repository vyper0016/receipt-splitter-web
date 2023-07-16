# Receipt splitter

## Description
This is my first try making a web app. It is a very simple app that allows partners to split grocery bills.<br>
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

![Opera Snapshot_2023-07-14_014412_127 0 0 1](https://github.com/vyper0016/receipt-splitter-web/assets/81050283/813e6ff6-19ce-4bba-a1bb-2785a9563a50)
![Opera Snapshot_2023-07-14_014454_127 0 0 1](https://github.com/vyper0016/receipt-splitter-web/assets/81050283/84909451-60a7-426d-8d3b-20a2f3e349d2)

- Then you wait for the progressbar

![Opera Snapshot_2023-07-14_014519_127 0 0 1](https://github.com/vyper0016/receipt-splitter-web/assets/81050283/1c8b6b2d-a6a5-4fe5-893a-6e4250c4369a)

- After that you will be automatically redirected to the prices table.

![253438614-50765a3b-cd8b-407d-979a-e3948e4fc3fc](https://github.com/vyper0016/receipt-splitter-web/assets/81050283/aa33bf82-eae3-4d9b-ac00-975eb929ab5d)


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
   
   ![Capture](https://github.com/vyper0016/receipt-splitter-web/assets/81050283/e99c9ee3-630e-4ab3-bddb-6532dbbf9936)

   
5. If you want to make it visible for other devices in the network, edit the last line of the `app.py` file and add `host='0.0.0.0'` in the app.run arguments
   make sure to disable debugging if you're not on a trusted network. <br>
   It should now look like this:<br>
   `app.run(host='0.0.0.0')`
   <br>
   - Note that the website is currently not optimized for phones but will function normally anyways, even if it looks a bit janky.

## Future Improvements
As mentioned above this is a proof of concept and my first shot at web based development in general, if i decide to improve on this I'd like to implement the following features:
- User Accounts to keep track of user data like partner names and save old receipts if needed
- Front-end improvements
- Implementation of a better, easier to maintain and scale OCR service
- Probably use django or an actual back-end platform like a normal person
