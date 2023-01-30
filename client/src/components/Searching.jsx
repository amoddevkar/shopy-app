import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import axios from "axios";
export default function Searching() {
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    let url = `https://shopyapp.onrender.com/api/v1/products?search=${searchQuery}`;
    try {
      let notExistObject = {
        products: [{ id: -1, name: "No such product exist in DB" }],
      };
      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      res.data.products.length ? setData(res.data) : setData(notExistObject);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignSelf: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <form onSubmit={handleSubmit}>
        <TextField
          id="search-bar"
          className="text"
          onInput={(e) => {
            setSearchQuery(e.target.value);
          }}
          variant="outlined"
          placeholder="Search..."
          size="small"
        />
        <IconButton type="submit" aria-label="search">
          <SearchIcon style={{ fill: "blue" }} />
        </IconButton>
      </form>
      {data && (
        <div style={{ padding: 3 }}>
          {data.products.map((d) => (
            <div
              className="text"
              style={{
                padding: 5,
                justifyContent: "normal",
                fontSize: 20,
                color: "blue",
                margin: 1,
                width: "250px",
                BorderColor: "green",
                borderWidth: "10px",
              }}
              key={d.id}
            >
              {d._id ? (
                <Link
                  to={`/product/${d._id}`}
                  style={{ textDecoration: "none", color: "white" }}
                >
                  {d.name}
                </Link>
              ) : (
                <>{d.name}</>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
