import { useSelector, useDispatch } from "react-redux";
import {  Link } from "react-router-dom";
import React from "react";
import { RootStore } from "../utils/TypeScript";
import { deleteBlog } from "../redux/actions/adminAction";
import NotFound from "../components/global/NotFound";
import { withStyles, Theme, createStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const columns = [
  { field: 'name', headerName: 'Name', width: 180 },
  {
    field: 'rating',
    headerName: 'Rating',
    type: 'number',
    width: 140,
  },
  {
    field: 'dateCreated',
    headerName: 'Created on',
    width: 180,
    type: 'date',
  },
  {
    field: 'isAdmin',
    headerName: 'Is admin?',
    width: 180,
    type: 'boolean',
  },
];
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

const AdminBlog = () => {
  const { auth, adminBlogsReducer, categories, admin } = useSelector(
    (state: RootStore) => state
  );
  const dispatch = useDispatch();
  const handleDelete = (id: string) => {
    console.log("delete");
    if(confirm('Bạn chắc chắn muốn xóa ?')) //eslint-disable-line
    {
      if (!auth.access_token) return;
      dispatch(deleteBlog(id, auth.access_token));
    }
    
  
  };

  if (auth.user?.role !== "admin") return <NotFound />;
  return (
    <div>
      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Title</StyledTableCell>
              <StyledTableCell align="right">Account</StyledTableCell>
              <StyledTableCell align="right">Description</StyledTableCell>
              <StyledTableCell align="right">Category</StyledTableCell>
              <StyledTableCell align="right">Create At</StyledTableCell>
              <StyledTableCell align="right">State</StyledTableCell>
              <StyledTableCell align="right">View</StyledTableCell>
              <StyledTableCell align="right"></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {adminBlogsReducer.map((blog) => (
              <StyledTableRow key={blog._id}>
                <StyledTableCell align="right">
                  <Link
                    to={`/blog/${blog._id}`}
                    style={{
                      textDecoration: "none",
                      textTransform: "capitalize",
                    }}
                  >
                    {blog.title}
                  </Link>
                </StyledTableCell>
                <StyledTableCell align="right">
                  {admin.map((item) =>
                    blog.user === item._id ? item.account : ""
                  )}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {blog.description}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {categories.map((item) =>
                    blog.category === item._id ? item.name : ""
                  )}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {new Date(blog.createdAt).toLocaleString()}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {blog.state}
                  {
                    blog.state === true ? "Published" :  "Pending"
                   
                  }
                </StyledTableCell>
                <StyledTableCell align="right">
                
                  {
                    blog.viewer
                   
                  }
                </StyledTableCell>
                <StyledTableCell align="right">
                  <i
                    className="fas fa-trash-alt"
                    onClick={() => handleDelete(blog._id as string)}
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

export default AdminBlog;
