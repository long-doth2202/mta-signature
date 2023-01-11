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
import ConfirmForm from "components/ConfirmForm";
import UserApi from "apis/UserApi";

import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

const cx = classNames.bind(styles);

function SigDatabase() {
  const [userList, setUserList] = useState([]);
  const [open, setOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const columns = [
    { field: "_id", headerName: "ID", width: 50 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "idNumber", headerName: "ID Number", width: 120 },
    { field: "phoneNumber", headerName: "Phone", width: 100 },
    { field: "address", headerName: "Address", width: 150 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        const handleLoadImageAction = (e) => {
          e.stopPropagation();
          console.log(params.row._id);
        };

        const handleDeleteUserAction = (e) => {
          // setConfirmOpen(true);
          e.stopPropagation();
          UserApi.deleteUser(params.row._id);
          window.location.reload(false);
        };

        return (
          <div className={cx("btnContainer")}>
            <Button
              onClick={handleLoadImageAction}
              variant="contained"
              component="label"
              color="success"
              className={cx("btnAction")}
            >
              <RemoveRedEyeOutlinedIcon className={cx("iconAction")} />
            </Button>

            <Button
              onClick={handleDeleteUserAction}
              variant="contained"
              component="label"
              color="error"
              className={cx("btnAction")}
            >
              <DeleteOutlineOutlinedIcon className={cx("iconAction")} />
            </Button>

            {/* <Dialog open={confirmOpen}>
              <DialogTitle>CONFIRM</DialogTitle>
              <DialogContent dividers>
                <ConfirmForm setConfirmOpen={setConfirmOpen} />
              </DialogContent>
            </Dialog> */}
          </div>
        );
      },
    },
  ];

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
              <CardHeader color="primary">
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
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}

export default SigDatabase;
