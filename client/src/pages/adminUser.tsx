import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { RootStore } from "../utils/TypeScript";

import { deleteUser } from "../redux/actions/adminAction";
import NotFound from "../components/global/NotFound";
import { withStyles, Theme, createStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
      textAlign: "center",
    },
    body: {
      fontSize: 14,
    },
  })
)(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
      },
    },
  })
)(TableRow);

const AdminUser = () => {
  const { auth, admin } = useSelector((state: RootStore) => state);
  const dispatch = useDispatch();

  const handleDelete = (id: string) => {
    if (confirm("Bạn chắc chắn muốn xóa ?"))//eslint-disable-line
     {
      
      if (!auth.access_token) return;
      dispatch(deleteUser(id, auth.access_token));
    }
  };

  if (auth.user?.role !== "admin") return <NotFound />;
  return (
    <div>
      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Account</StyledTableCell>
              <StyledTableCell align="right">name</StyledTableCell>
              <StyledTableCell align="right">Create At</StyledTableCell>
              <StyledTableCell align="right">Update At</StyledTableCell>
              <StyledTableCell align="right"></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {admin
              .filter((item) => item.role === "user")
              .map((user) => (
                <StyledTableRow key={user.account}>
                  <Link
                    to={`/profile/${user._id}`}
                    style={{
                      textDecoration: "none",
                      textTransform: "capitalize",
                    }}
                  >
                    <StyledTableCell align="right">
                      {user.account}
                    </StyledTableCell>
                  </Link>
                  <StyledTableCell align="right">{user.name}</StyledTableCell>
                  <StyledTableCell align="right">
                    {user.createdAt}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {user.updatedAt}
                  </StyledTableCell>

                  <StyledTableCell align="right">
                    <i
                      className="fas fa-trash-alt"
                      onClick={() => handleDelete(user._id)}
                    />
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AdminUser;
