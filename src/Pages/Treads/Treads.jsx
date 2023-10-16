import React, { useEffect, useState } from "react";
import "./Treads.css";
import api from "../../Shared/API/api";

const Treads = () => {
  const [treadsData, setTreadsData] = useState([]);
  const [treadDataCopy, setTreadDataCopy] = useState([]);
  const [providerData, setProviderData] = useState([]);
  const [treadTypeData, setTreadTypeData] = useState([]);
  const [diameterData, setDiameterData] = useState([]);
  const [colorData, setColorData] = useState([]);

  const [treadProvider, setTreadProvider] = useState("");
  const [treadTreadType, setTreadTreadType] = useState("");
  const [treadDiameter, setTreadDiameter] = useState("");
  const [treadColor, setTreadColor] = useState("");
  const [selectData, setSelectData] = useState([]);
  const [field, setField] = useState("");
  const [group, setGroup] = useState("");


  useEffect(() => {
    api
      .get("/treads")
      .then((response) => {
        setTreadsData(response);
        setTreadDataCopy(response);
      })
      .catch((error) => {
        console.log(error);
      });
    api
      .get("/providers")
      .then((response) => {
        setProviderData(response);
      })
      .catch((error) => {
        console.log(error);
      });

    api
      .get("/treadTypes")
      .then((response) => {
        setTreadTypeData(response);
      })
      .catch((error) => {
        console.log(error);
      });

    api
      .get("/diameters")
      .then((response) => {
        setDiameterData(response);
      })
      .catch((error) => {
        console.log(error);
      });

    api
      .get("/colors")
      .then((response) => {
        setColorData(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const fnAddTread = () => {
    const newTread = {
      provider: treadProvider,
      treadType: treadTreadType,
      diameter: treadDiameter,
      color: treadColor,
    };

    api.post("/treads/new", newTread).then(() => {
      api.get("/treads").then((response) => {
        setTreadsData(response);
        setTreadDataCopy(response);
      });
    });
  };

  const fnUploadSeconFilter = (field) => {
    setGroup(field);
    switch (field) {
      case "Proveedor":
        setSelectData(providerData);
        setField("name");
        break;
      case "Tipo de cuerda":
        setSelectData(treadTypeData);
        setField("treadType");
        break;
      case "Diámetro":
        setSelectData(diameterData);
        setField("diameter");
        break;
      case "Color":
        setSelectData(colorData);
        setField("name");
        break;
      default:
        setSelectData([]);
        setTreadDataCopy(treadsData);
    }
  };

  const fnFilter = (filterValue) => {
    switch (group) {
      case "Proveedor":
        setTreadDataCopy(
          treadsData.filter((item) => item.provider.name === filterValue)
        );
        break;
      case "Tipo de cuerda":
        setTreadDataCopy(
          treadsData.filter((item) => item.treadType.name === filterValue)
        );
        break;
      case "Diámetro":
        const filterValuesFloat = parseFloat(filterValue);
        setTreadDataCopy(
          treadsData.filter(
            (item) => item.diameter.diameter === filterValuesFloat
          )
        );
        break;
      case "Color":
        setTreadDataCopy(
          treadsData.filter((item) => item.color.name === filterValue)
        );
        break;
      default:
        setTreadDataCopy(treadsData);
    }
  };

  return (
    <div className="providersContainer">
      <div className="providersTitle">
        <h1>CUERDAS</h1>
      </div>
      <h2>Filtrar</h2>
      <select
        className="treadInput selectTread"
        onChange={(e) => {
          fnUploadSeconFilter(e.target.value);
        }}
      >
        <option>Todos</option>
        <option>Proveedor</option>
        <option>Tipo de cuerda</option>
        <option>Diámetro</option>
        <option>Color</option>
      </select>
      {selectData && selectData.length > 0 && (
        <select
          className="treadInput selectTread"
          onChange={(e) => {
            fnFilter(e.target.value);
          }}
        >
          <option>Selecciona</option>
          {selectData &&
            selectData.length > 0 &&
            selectData.map((item, index) => (
              <option key={index}>
                {field === "diameter" ? item.diameter : item.name}
              </option>
            ))}
        </select>
      )}
      <div className="providersItemsContainer">
        {treadDataCopy &&
          treadDataCopy.length > 0 &&
          treadDataCopy.map((item, index) => (
            <div key={index} className="treadItemContainer">
              <p className="treads_name">{item.provider.name}</p>
              <p className="treads_name">{item.treadType.name}</p>
              <p className="treads_name">{item.diameter.diameter} mm</p>
              <p className="treads_name">{item.color.name}</p>
              <div className="treadColorImageContainer">
                <img
                  className="treadColorImage"
                  src={`http://localhost:5000/images/colors/${item.color.image}`}
                  alt="color"
                />
              </div>
            </div>
          ))}
      </div>

      <div className="newTreadContainer">
        <h1>CREAR CUERDA</h1>
        <select
          className="treadInput "
          onChange={(e) => {
            setTreadProvider(e.target.value);
          }}
        >
          <option>Proveedor</option>
          {providerData &&
            providerData.length > 0 &&
            providerData.map((item, index) => (
              <option key={index} value={item._id}>
                {item.name}
              </option>
            ))}
        </select>
        <select
          className="treadInput "
          onChange={(e) => {
            setTreadTreadType(e.target.value);
          }}
        >
          <option>Tipo de hilo</option>
          {treadTypeData &&
            treadTypeData.length > 0 &&
            treadTypeData.map((item, index) => (
              <option key={index} value={item._id}>
                {item.name}
              </option>
            ))}
        </select>
        <select
          className="treadInput "
          onChange={(e) => {
            setTreadDiameter(e.target.value);
          }}
        >
          <option>Diametro</option>
          {diameterData &&
            diameterData.length > 0 &&
            diameterData.map((item, index) => (
              <option key={index} value={item._id}>
                {item.diameter}
              </option>
            ))}
        </select>
        <select
          className="treadInput"
          onChange={(e) => {
            setTreadColor(e.target.value);
          }}
        >
          <option>Color</option>
          {colorData &&
            colorData.length > 0 &&
            colorData.map((item, index) => (
              <option key={index} value={item._id}>
                {item.name}
              </option>
            ))}
        </select>
        <button
        type="button"
        className="btn_save-tread"
        onClick={() => {
          fnAddTread();
        }}
      >
        GUARDAR
      </button>
      </div>
      <div>
    
      </div>
    </div>
  );
};

export default Treads;
