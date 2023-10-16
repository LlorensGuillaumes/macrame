import React, { useEffect, useState } from "react";
import "./Purchase.css";
import { useNavigate } from "react-router-dom";
import api from "../../Shared/API/api";

const Purchase = ({ userData, setUserData }) => {
const navigate = useNavigate();
const miPedido = localStorage.getItem("es_cotton.macrame-pedido");

const [purchaseTramitedVisible, setPurchaseTramitedVisible] = useState(false);
const [error, setError] = useState(false);
const [cp, setCP] = useState("");
const [town, setTown] = useState("");
const [province, setProvince] = useState("");
const [street, setStreet] = useState("");
const [num, setNum] = useState("");
const [floor, setFloor] = useState("");
const [door, setDoor] = useState("");
const [obs, setObs] = useState("");
const [phone, setPhone] = useState("");

const [cpBill, setCPBill] = useState("");
const [townBill, setTownBill] = useState("");
const [provinceBill, setProvinceBill] = useState("");
const [streetBill, setStreetBill] = useState("");
const [numBill, setNumBill] = useState("");
const [floorBill, setFloorBill] = useState("");
const [doorBill, setDoorBill] = useState("");
const [obsBill, setObsBill] = useState("");
const [completeNameBill, setCompletNameBill] = useState("");
const [cipBill, setCipBill] = useState("");

const [billDataVisible, setBillDataVisible] = useState(false);
const [sendDataVisible, setSendDataVisible] = useState(true);

const fnDataSend = () => {
    if (
    cp === "" ||
    town === "" ||
    province === "" ||
    street === "" ||
    num === "" ||
    phone === ""
) {
    setError(true);
} else {
    setBillDataVisible(true);
    setSendDataVisible(false);
    setCPBill(cp);
    setTownBill(town);
    setProvinceBill(province)
    setStreetBill(street);
    setNumBill(num);
    setFloorBill(floor);
    setDoorBill(door);
    setObsBill(obs);
}
}

const downloadMiPedido = (fileName) =>{
    const link = document.createElement('a');
    link.href = miPedido;
    link.download = `es_cotton-macrame_${fileName}.pdf`;
    link.style.display = 'none';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

const fnTramitarPedido = () => {
setError(false);
if (
    cpBill === "" ||
    townBill === "" ||
    provinceBill === "" ||
    streetBill === "" ||
    numBill === "" ||
    completeNameBill === "" ||
    cipBill === ""
) {
    setError(true);
} else {
    const purchaseNumber = Math.floor(Date.now() / 1000);
    const dataToSend = {
    puchaseNum: purchaseNumber,
    dataSend: {
        cp: cp,
        town: town,
        province: province,
        street: street,
        num: num,
        floor: floor,
        door: door,
        obs: obs,
        phone: phone,
        clientMail: userData.mail,
        clientName: userData.name,
    },
    shoppingCart: userData.shoppingCart,
    dataBill:{
        cp: cpBill,
        town: townBill,
        povince: provinceBill,
        street: streetBill,
        num: numBill,
        floor: floorBill,
        door: doorBill,
        clientName: completeNameBill,
        nif: cipBill,
    },
    };

    api
    .post("/purchases/new", dataToSend)
    .then((response) => {
        if (!response.error) {
        setPurchaseTramitedVisible(true);
        api
            .put(`/users/update/${userData._id}`, {
            userModify: { shoppingCart: [] },
            changePassword: false,
            })
            .then((response) => {
            if (!response.error) {
                api
                .get(`/users/id/${userData._id}`)
                .then((response) => {
                    setUserData(response);
                })
                .catch((error) => {
                    console.log(error);
                });
            }
            })
            .catch((error) => {
            console.log(error);
            });
        }
        console.log(response);
    })

    .catch((error) => {
        console.log(error);
    });
    
};
};
return (
<div className="purchaseContainer">
    <div className="">
    <h1>TRAMITAR COMPRA</h1>
    {sendDataVisible && (
        <div className="sendDirection">
        <h2 className="sendTitle">¿DÓNDE TE LO ENVÍO?</h2>
        {error && (
            <p className="error">
            Los campos maracados con * son obligatorios
            </p>
        )}
        <div className="directionLines">
            <input
                type="text"
                placeholder="CP *"
                className="inputDirecction cp"
                value={cp}
                onChange={(e) => {
                setCP(e.target.value);
                }}
            />
            <input
                type="text"
                placeholder="Población *"
                className="inputDirecction  town"
                value={town}
                onChange={(e) => {
                setTown(e.target.value);
                }}
            />
        </div>
        <div className="directionLines">
            <input
                type="text"
                placeholder="Provincia *"
                className="inputDirecction province"
                value={province}
                onChange={(e) => {
                setProvince(e.target.value);
                }}
            />
        </div>
        <div className="directionLines">
            <input
                type="text"
                placeholder="Calle *"
                className="inputDirecction street"
                value={street}
                onChange={(e) => {
                setStreet(e.target.value);
                }}
            />
        </div>
        <div className="directionLines">
            <input
                type="text"
                placeholder="Núm *"
                className="inputDirecction number"
                value={num}
                onChange={(e) => {
                setNum(e.target.value);
                }}
            />
            <input
                type="text"
                placeholder="Piso"
                className="inputDirecction number"
                value={floor}
                onChange={(e) => {
                setFloor(e.target.value);
                }}
            />
            <input
                type="text"
                placeholder="Puerta"
                className="inputDirecction number"
                value={door}
                onChange={(e) => {
                setDoor(e.target.value);
                }}
            />
        </div>

        <div className="directionLines">
            <input
                type="text"
                placeholder="Observaciones de envio"
                className="inputDirecction obs"
                value={obs}
                onChange={(e) => {
                setObs(e.target.value);
                }}
            />
        </div>
            <input
            type="text"
            placeholder="Teléfono *"
            className="inputDirecction telf"
            value={phone}
            onChange={(e) => {
                setPhone(e.target.value);
            }}
            />
        <button
            className="btnAccept"
            onClick={() => {
            fnDataSend()
            }}
        >
            CONTINUAR
        </button>
        </div>
    )}

    {billDataVisible && (
        <div className="sendDirection">
        <h2 className="sendTitle">DATOS DE FACTURACIÓN</h2>
        {error && (
            <p className="error">
            Los campos maracados con * son obligatorios
            </p>
        )}
        <input
        type="text"
        placeholder="Nombre completo *"
        className="inputDirecction"
        value={completeNameBill}
        onChange={(e) => {
        setCompletNameBill(e.target.value);
        }}
        />
        <input
        type="text"
        placeholder="NIF / CIF *"
        className="inputDirecction nif"
        value={cipBill}
        onChange={(e) => {
        setCipBill(e.target.value);
        }}
        />
        <div className="directionLines">

            <input
                type="text"
                placeholder="CP *"
                className="inputDirecction cp"
                value={cpBill}
                onChange={(e) => {
                setCPBill(e.target.value);
                }}
            />
            <input
                type="text"
                placeholder="Población *"
                className="inputDirecction  town"
                value={townBill}
                onChange={(e) => {
                setTownBill(e.target.value);
                }}
            />
        </div>
        <div className="directionLines">
            <input
                type="text"
                placeholder="Provincia *"
                className="inputDirecction province"
                value={provinceBill}
                onChange={(e) => {
                setProvinceBill(e.target.value);
                }}
            />
        </div>
        <div className="directionLines">
            <input
                type="text"
                placeholder="Calle *"
                className="inputDirecction street"
                value={streetBill}
                onChange={(e) => {
                setStreetBill(e.target.value);
                }}
            />
        </div>

        <div className="directionLines">
        
            <input
                type="text"
                placeholder="Núm *"
                className="inputDirecction number"
                value={numBill}
                onChange={(e) => {
                setNumBill(e.target.value);
                }}
            />
            <input
                type="text"
                placeholder="Piso"
                className="inputDirecction number"
                value={floorBill}
                onChange={(e) => {
                setFloorBill(e.target.value);
                }}
            />
            <input
                type="text"
                placeholder="Puerta"
                className="inputDirecction number"
                value={doorBill}
                onChange={(e) => {
                setDoorBill(e.target.value);
                }}
            />

        </div>

        <div className="directionLines">
            <input
                type="text"
                placeholder="Observaciones de envio"
                className="inputDirecction obs"
                value={obsBill}
                onChange={(e) => {
                setObsBill(e.target.value);
                }}
            />
        </div>
        <button className="btnAccept" onClick={() => fnTramitarPedido()}>
            TRAMITAR
        </button>
        </div>
    )}
    </div>
    {purchaseTramitedVisible && (
    <div className="purchaseOk">
        <h1>PEDIDO TRAMITAO</h1>
        <p>Puedes ver tu pedido en la sección Mis pedidos</p>
        <button
        onClick={() => {
            setPurchaseTramitedVisible(false);
            navigate("/");
        }}
        >
        CERRAR
        </button>
    </div>
    )}
</div>
);
};


export default Purchase;
