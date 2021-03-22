import React, { useState, useEffect } from 'react';
import axios from "axios";
import ReactPaginate from "react-paginate";
import './App.css';

const App = () => {
  const [comments, setComments] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/comments")
      .then(res => {
        setComments(res.data.slice(0, 51));
      })
      .catch(err => {
        throw err
      })

    return () => {}
  }, []);

  const userPerPage = 10;
  const pagesVisited = pageNumber * userPerPage

  const displayUser = comments
    .slice(pagesVisited, pagesVisited + userPerPage)
    .map(item => {
      return (
        <tr key={item.id}>
          <td>{item.id}</td>
          <td>{item.name}</td>
          <td>{item.body}</td>
          <td>{item.email}</td>
        </tr>
      )
    });
  
  const pageCount = Math.ceil(comments.length / userPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <>
      <div className="text-uppercase my-3 text-center fw-bold fs-3">pagination</div>
      <div className="w-50 mx-auto">
        <table className="table mt-5">
          <thead className="text-center">
            <tr>
              <th scope="col" className="text-uppercase">id</th>
              <th scope="col" className="text-uppercase">name</th>
              <th scope="col" className="text-uppercase">body</th>
              <th scope="col" className="text-uppercase">email</th>
            </tr>
          </thead>
          <tbody>
          { displayUser }
          </tbody>
        </table>
        <div className="my-5">
            <ReactPaginate
              previousLabel={"Previous"}
              nextLabel={"Next"}
              pageCount={pageCount}
              onPageChange={changePage}
              containerClassName={"pagination"}
              previousLinkClassName={"previosButton"}
              nextLinkClassName={"nextButton"}
              disabledClassName={"paginationDisabled"}
              activeClassName={"paginationActive"}
            />
          </div>
      </div>
    </>
  );
}

export default App;
