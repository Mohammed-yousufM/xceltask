import React, { useState, useEffect } from "react";
import axios from "axios";

function FirstScreen() {
  const [resData, setResData] = useState({});
  const [upKey, setUpKey] = useState("");
  const [upId, setUpId] = useState("");
  const [upValue, setUpValue] = useState("");
  const [adKey, setAdKey] = useState("");
  const [adValue, setAdValue] = useState("");

  const jwtSecret = localStorage.getItem("jwtSecret");

  const newAxios = axios.create({
    baseURL: "http://15.206.118.222:5000/admin",
    headers: {
      Authorization: `Bearer ${jwtSecret}`,
    },
  });

  useEffect(() => {
    getDetails();
  }, []);

  const getDetails = async () => {
    try {
      const res = await newAxios.get("/department/list");
      setResData(res.data.data);
      console.log(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const updateFunc = async () => {
    const res = await newAxios.post("/department/update", {
      dId: upId,
      [upKey]: upValue,
    });
    console.log(res);
  };

  const addFunc = async (recorId) => {
    const res = await newAxios.post("/department/add", {
      [adKey]: adValue,
    });
    console.log(res);
  };

  const renderTable = () => {
    return (
      <div style={{ width: "100%" }}>
        <h2>Table rendering data</h2>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">NAME</th>
              <th scope="col">STATUS</th>
            </tr>
          </thead>
          <tbody>
            {resData.rows.map((record) => {
              return (
                <tr key={record.id}>
                  <td>{record.id}</td>
                  <td>{record.name}</td>
                  <td>{record.status}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div>
      <>
        {resData.rows?.length ? (
          renderTable()
        ) : (
          <p>There are no records for this account</p>
        )}
      </>
      <hr />
      <div>
        <h5>Update a Record</h5>
        <input
          type="text"
          placeholder="ID"
          value={upId}
          onChange={(e) => setUpId(e.target.value)}
          style={{ margin: 5, width: 100 }}
        />
        <input
          type="text"
          placeholder="Key"
          value={upKey}
          onChange={(e) => setUpKey(e.target.value)}
          style={{ margin: 5, width: 100 }}
        />
        <input
          type="text"
          placeholder="value"
          value={upValue}
          onChange={(e) => setUpValue(e.target.value)}
          style={{ margin: 5, width: 100 }}
        />
        <button style={{ margin: 5 }} onClick={updateFunc}>
          update
        </button>
      </div>
      <hr />
      <div>
        <h5>Add a Record</h5>
        {/* <input type="text" placeholder="ID" style={{ margin: 5, width: 100 }} /> */}
        <input
          type="text"
          placeholder="Key"
          value={adKey}
          onChange={(e) => setAdKey(e.target.value)}
          style={{ margin: 5, width: 100 }}
        />
        <input
          type="text"
          placeholder="value"
          value={adValue}
          onChange={(e) => setAdValue(e.target.value)}
          style={{ margin: 5, width: 100 }}
        />
        <button style={{ margin: 5 }} onClick={addFunc}>
          update
        </button>
      </div>
      <hr />
      <p>* || ID= Dept ID || key = name || value = any ||</p>
      <p>
        Please refresh page if you've performed any of CRUD operations and look
        into console for more insight
      </p>
    </div>
  );
}

export default FirstScreen;
