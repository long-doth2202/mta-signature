import React from "react";
import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";

import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

import styles from "./SigDatabase.modules.scss";
import classNames from "classnames/bind";
import AddUserForm from "components/AddUserForm";
import UserApi from "apis/UserApi";

const cx = classNames.bind(styles);

const columns = [
  { field: "_id", headerName: "ID", width: 50 },
  { field: "name", headerName: "Name", width: 200 },
  { field: "email", headerName: "Email", width: 200 },
  { field: "idNumber", headerName: "ID Number", width: 120 },
  { field: "phoneNumber", headerName: "Phone", width: 120 },
  { field: "address", headerName: "Address", width: 200 },
  { field: "action", headerName: "Action", width: 100 },
];

function SigDatabase() {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    const getUserList = async () => {
      try {
        const apiRes = await UserApi.getUserList();
        if (apiRes.status === 200) {
          setUserList(apiRes.data);
          console.log(apiRes.data);
        } else {
          // setState(0);
        }
      } catch (error) {
        // setState(0);
      }
    };
    getUserList();
  }, []);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <div>
        <Button
          variant="contained"
          component="label"
          color="primary"
          onClick={handleClickOpen}
        >
          Add new user
        </Button>

        <Dialog open={open} onTouchCancel={handleClose}>
          <DialogTitle onClose={handleClose} className={cx("titleAddForm")}>
            ADD NEW USER
          </DialogTitle>
          <DialogContent dividers>
            <AddUserForm setOpen={setOpen} />
          </DialogContent>
        </Dialog>
      </div>

      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="success">
                <h4 className={cx("cardTitleWhite")}>User List</h4>
                <p className={cx("cardCategoryWhite")}>
                  The list includes user information and signature records
                </p>
              </CardHeader>
              <div style={{ height: 400, width: "100%" }}>
                <DataGrid
                  rows={userList}
                  columns={columns}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                  // checkboxSelection
                  getRowId={(row) => row._id}
                />
              </div>

              {/* <CardBody>
                <Table
                  tableHeaderColor="primary"
                  tableHead={[
                    "Name",
                    "Email",
                    "Phone",
                    "ID Number",
                    "Address",
                    "Action",
                  ]}
                  tableData={dataSample}
                />
              </CardBody> */}
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}

export default SigDatabase;
