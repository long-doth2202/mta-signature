import React from "react";
import { useState } from "react";
import { Button } from "@mui/material";
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

const cx = classNames.bind(styles);

function SigDatabase() {
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
              <CardBody>
                <Table
                  tableHeaderColor="primary"
                  tableHead={["Name", "Country", "City", "Salary"]}
                  tableData={[
                    ["Dakota Rice", "Niger", "Oud-Turnhout", "$36,738"],
                    ["Minerva Hooper", "Curaçao", "Sinaai-Waas", "$23,789"],
                    ["Sage Rodriguez", "Netherlands", "Baileux", "$56,142"],
                    [
                      "Philip Chaney",
                      "Korea, South",
                      "Overland Park",
                      "$38,735",
                    ],
                    [
                      "Doris Greene",
                      "Malawi",
                      "Feldkirchen in Kärnten",
                      "$63,542",
                    ],
                    ["Mason Porter", "Chile", "Gloucester", "$78,615"],
                  ]}
                />
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}

export default SigDatabase;
