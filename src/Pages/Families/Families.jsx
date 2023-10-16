import React, { useEffect, useState } from "react";
import "./Families.css";
import api from "../../Shared/API/api";

const Families = () => {
  const [familyData, setFamilyData] = useState([]);
  const [newFamily, setNewFamily] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedValue, setEditedValue] = useState("");

  const getFamilies = () => {
    api
      .get("/families/")
      .then((response) => {
        response.sort((a, b) => {
          const lowA = a.group.toLowerCase();
          const lowB = b.group.toLowerCase();

          if (lowA < lowB) {
            return -1;
          }

          if (lowA > lowB) {
            return 1;
          }
          return 0;
        });
        setFamilyData(response);
        setIsEditing(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  useEffect(() => {
    getFamilies();
  }, []);

  const fnAddCategory = () => {
    const newFamilyTrimed = newFamily.trim();
    if (newFamilyTrimed === "") {
      alert("nueva Categoria vacía");
    } else if (
      familyData.find((category) => category.group === newFamilyTrimed)
    ) {
      alert("la categoría ya existe");
    } else {
      const newFamilyToAdd = {
        group: newFamilyTrimed,
      };
      api.post("/families/new/", newFamilyToAdd).then(() => {
        api
          .get("/families/")
          .then((response) => {
            response.sort((a, b) => {
              const lowA = a.group.toLowerCase();
              const lowB = b.group.toLowerCase();

              if (lowA < lowB) {
                return -1;
              }

              if (lowA > lowB) {
                return 1;
              }
              return 0;
            });
            setFamilyData(response);
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
      });
    }
  };

  const fnSelectGroup = (index) => {
    setEditingIndex(index);
    setEditedValue(familyData[index].group);
    setIsEditing(true);
  };

  const fnSaveEditedValue = () => {

    api
      .put(`/families/edit/${familyData[editingIndex]._id}`, {
        group: editedValue,
      })
      .then(getFamilies());

    setIsEditing(false);
  };

  const fnCancelEdit = () => {
    setIsEditing(false);
  };

  const fnDeleteGroup = (groupName) => {
    api
      .get(`/products/family/${groupName}`)
      .then((response) => {
        if (response.data && response.data.length > 0) {
          async function deleteProducts() {
            for (const product of response.data) {
              const id = product._id;

              try {
                await api.delete(`/products/delete/${id}`);
                console.log(`Producto eliminado con ID: ${id}`);
              } catch (error) {
                console.error(
                  `Error al eliminar producto con ID: ${id}`,
                  error
                );
              }
            }
          }
          deleteProducts()
            .then(() => {
              api
                .delete(`/families/delete/${groupName}`)
                .then((response) => {
                  getFamilies();
                })
                .catch((error) => {
                  console.error("Error al eliminar la familia:", error);
                });
            })
            .catch((error) => {
              console.error("Error al eliminar productos:", error);
            });
        } else {
          api
            .delete(`/families/delete/${groupName}`)
            .then((response) => {
              getFamilies();
            })
            .catch((error) => {
              console.error("Error al eliminar la familia:", error);
            });
        }
      })
      .catch((error) => {
        console.error("Error al obtener productos por familia:", error);
      });
  };

  return (
    <div className="categoriesContainer">
      <h1 className="categoriesTitle">FAMILIAS</h1>
      <div className="groupContainer">
        {familyData &&
          familyData.length > 0 &&
          familyData.map((item, index) => (
            <div key={index} className="group">
              <div>
                <p className="itemGroup" onClick={() => fnSelectGroup(index)}>
                  {item.group}{" "}
                </p>
              </div>
            </div>
          ))}
      </div>
      {isEditing && (
        <div className="modal">
          <div className="modal-content nameCategory">
            <input
              className="loginInput nuevaFamilia"
              type="text"
              placeholder={`Introduce nuevo valor ${editedValue.toUpperCase()}`}
              onChange={(e) => setEditedValue(e.target.value)}
            />
            <button
              onClick={() => {
                fnSaveEditedValue();
              }}
              className="btnNavbar btnAddCategory"
            >
              Guardar
            </button>
            <button onClick={fnCancelEdit} className="btnNavbar btnAddCategory">
              Cancelar
            </button>
          </div>
          <div className="modal-content nameCategory">
            <button
              onClick={() => {
                fnDeleteGroup(editedValue);
              }}
              className="btnDropItem"
            >
              Eliminar "{editedValue}"
            </button>
          </div>
        </div>
      )}

      {!isEditing && (
        <div className="nameCategory">
          <input
            placeholder="Nueva família"
            className="loginInput nuevaFamilia upper"
            onChange={(e) => setNewFamily(e.target.value)}
          />
          <div
            className="btnNavbar btnAddCategory"
            onClick={() => {
              fnAddCategory();
            }}
          >
            Agregar
          </div>
        </div>
      )}
    </div>
  );
};

export default Families;
