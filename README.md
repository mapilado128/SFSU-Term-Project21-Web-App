# CSC 317 Term Project

## Purpose

The purpose of this repository is to store all the code for your web application. This also includes the history of all commits made and who made them. Only code submitted on the master branch will be graded.

Please follow the instructions below and fill in the information requested when prompted.

## Student Information

|               | Information               |
|:-------------:|:-------------------------:|
| Student Name  | MIllinh Apilado           |
| Student ID    | 920649519                 |
| Student Email | mapilado@mail.sfsu.edu    |



# Build/Run Instructions

## Build Instructions
**1.** Import the database (.sql) file into your MySQL Workbench
   or through commandline/terminal

**On Workbench:**
- Click on the plus sign beside "MySQL Connections"
- Type in your preferred Connection Name etc.
- Once you're in, on the bottom right will be an Administration tab
- Inside the Administration tab, click on the Data Import/Restore
- You may choose Import from Self-Contained File and choose the 
           folder that containes the sql file
- After choosing the file, make sure to set Default Target Schema to
           where you want to import the file - else, click new and start import
- You can now switch to the Schemas tab and see the db tables on  there 

**2.** Once the database file is all good, using your terminal do:
   ```
    cd application
    ```

**3.** Again, on your terminal, do:
   ```
    npm install
    ```

## Run Instructions
**1.** Make sure NPM is installed
**2.** Once you're sure, on your terminal, do:
   ```
    npm start
    ```
3. Finally, while npm is running, go to your web-browser and type in:
    [localhost:3000]
