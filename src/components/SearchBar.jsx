import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Table from "react-bootstrap/Table";
import ClientDetailsModal from "./Modals/ClientDetailsModal";
import GenerateQRModal from "./Modals/GenerateQRModal";
import EditClientModal from "./Modals/EditClientModal";
import styles from "./SearchBar.module.css";
import CreateUser from "../components/Modals/CreateUser";
import { GrSearchAdvanced } from "react-icons/gr";
import {
  cleanClientTurnsStateReducer,
  getUsersReducer,
  getUserTurnsReducer,
} from "../features/users/usersGetSlice";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import ReactPaginate from "react-paginate";

const SearchBar = () => {
  const dispatch = useDispatch();
  const [inputSearchFocus, setInputSearchFocus] = useState(false);
  const [inputData, setInputData] = useState("");
  const loadingGetUsers = useSelector(
    (state) => state.usersStore.loadingGetUsers
  );
  const usersRedux = useSelector((state) => state.usersStore.users);
  const [users, setUsers] = useState(usersRedux);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [resultsSearch, setResultsSearch] = useState([]);
  const [error, setError] = useState();
  const [modalClientDetailsShow, setModalClientDetailsShow] = useState(false);
  const [order, setOrder] = useState("desc");
  const itemsPerPage = 10;
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = users.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(users.length / itemsPerPage);

  const handleChangeInputData = (e) => {
    setInputData(e.target.value);
  };

  const getClientByNameOrPhone = async () => {
    if (inputData.length === 0) {
      setResultsSearch("noInput");
      setInputSearchFocus(false);
    }
    if (inputData.length > 0) {
      setInputSearchFocus(true);
      setLoadingSearch(true);
      setItemOffset(0);
      try {
        const response = await axios.put("/getUsersByNameOrPhone", {
          input: inputData,
        });
        setLoadingSearch(false);
        if (response.data.length === 0) return setResultsSearch("noResults");
        return setResultsSearch(response.data);
      } catch (err) {
        setError(err);
        setLoadingSearch(false);
      }
    }
  };

  const clearInputButton = () => {
    setResultsSearch("noInput");
    setInputSearchFocus(false);
    setInputData("");
  };

  const onClickDetailModal = async (el) => {
    await dispatch(getUserTurnsReducer({ id: el._id }));
    setModalClientDetailsShow(true);
  };

  const onCloseDetailModal = async () => {
    await dispatch(cleanClientTurnsStateReducer());
    setModalClientDetailsShow(false);
  };

  const usersListOrdered = () => {
    if (!inputSearchFocus && !loadingGetUsers) {
      let aux = [...usersRedux];
      if (order === "desc") {
        aux.sort((a, b) => b.totalCuts - a.totalCuts);
        setUsers(aux);
      } else {
        aux.sort((a, b) => a.totalCuts - b.totalCuts);
        setUsers(aux);
      }
    } else {
      let aux = [...resultsSearch];
      if (order === "desc") {
        aux.sort((a, b) => b.totalCuts - a.totalCuts);
        setResultsSearch(aux);
      } else {
        aux.sort((a, b) => a.totalCuts - b.totalCuts);
        setResultsSearch(aux);
      }
    }
  };

  useEffect(() => {
    getClientByNameOrPhone();
  }, [inputData, usersRedux]);

  useEffect(() => {
    usersListOrdered();
  }, [usersRedux, order, inputData]);

  useEffect(() => {
    dispatch(getUsersReducer());
  }, [inputData.length === 0]);

  const handlePageClickUsersList = (event) => {
    const newOffset = (event.selected * itemsPerPage) % users.length;
    setItemOffset(newOffset);
  };

  return (
    <div>
      <div className={styles.containerInputSearchAndButtonAdd}>
        <div className={styles.containerInputSearch}>
          <label htmlFor='inputSearch'>
            A continuacion, escriba el nombre o el numero de telefono de la
            persona
          </label>
          <div className={styles.inputSearch}>
            <div>
              <input
                id='inputSearch'
                onChange={handleChangeInputData}
                value={inputData}
                type='text'
                placeholder='Busca un cliente'
                autoComplete='off'
              />
              {inputData.length > 0 ? (
                <RxCross2
                  onClick={clearInputButton}
                  style={{ marginLeft: "-25px", cursor: "pointer" }}
                />
              ) : null}
            </div>
            <p className={styles.resultsNumber}>
              {resultsSearch === "noInput"
                ? null
                : resultsSearch === "noResults"
                ? "(0 resultados)"
                : resultsSearch.length === 1
                ? `(${resultsSearch.length} resultado)`
                : `(${resultsSearch.length} resultados)`}
            </p>
          </div>
        </div>
        <CreateUser />
      </div>

      {inputSearchFocus ? (
        <div className={styles.tableResultsContainer}>
          <Table>
            <thead>
              <tr>
                <th></th>
                <th>Nombre</th>
                <th>Telefono</th>
                <th>
                  Cortes totales{" "}
                  {order === "desc" ? (
                    <TiArrowSortedDown onClick={() => setOrder("asc")} />
                  ) : (
                    <TiArrowSortedUp onClick={() => setOrder("desc")} />
                  )}
                </th>
                <th>Detalles</th>
                <th>Editar</th>
              </tr>
            </thead>
            <tbody>
              {loadingSearch ? (
                <tr>
                  <th>Cargando</th>
                </tr>
              ) : error ? (
                <tr>
                  <th>Se ha encontrado un error: {error}</th>
                </tr>
              ) : resultsSearch === "noInput" ? null : resultsSearch ===
                "noResults" ? null : (
                resultsSearch.map((el, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        <GenerateQRModal client={el} />
                      </td>
                      <td>{el.name}</td>
                      <td>+{el.phone}</td>
                      <td>{el.totalCuts}</td>
                      <td>
                        <GrSearchAdvanced
                          className={styles.searchButton}
                          onClick={() => onClickDetailModal(el)}
                        />
                        <ClientDetailsModal
                          show={modalClientDetailsShow}
                          onHide={onCloseDetailModal}
                          client={el}
                        />
                      </td>
                      <td>
                        <EditClientModal
                          client={el}
                          inputSearchFocus={inputSearchFocus}
                          handleChangeResultsState={(data) =>
                            setResultsSearch(data)
                          }
                          resultsSearch={resultsSearch}
                          getClientByNameOrPhone={() =>
                            getClientByNameOrPhone()
                          }
                        />
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </Table>
        </div>
      ) : (
        <div className={styles.tableResultsContainer}>
          <Table>
            <thead>
              <tr>
                <th></th>
                <th>Nombre</th>
                <th>Telefono</th>
                <th>
                  Cortes totales{" "}
                  {order === "desc" ? (
                    <TiArrowSortedDown onClick={() => setOrder("asc")} />
                  ) : (
                    <TiArrowSortedUp onClick={() => setOrder("desc")} />
                  )}
                </th>
                <th>Detalles</th>
                <th>Editar</th>
              </tr>
            </thead>
            <tbody>
              {loadingGetUsers ? (
                <tr>
                  <th>Cargando</th>
                </tr>
              ) : (
                currentItems.map((el, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        <GenerateQRModal client={el} />
                      </td>
                      <td>{el.name}</td>
                      <td>+{el.phone}</td>
                      <td>{el.totalCuts}</td>
                      <td>
                        <GrSearchAdvanced
                          className={styles.searchButton}
                          onClick={() => onClickDetailModal(el)}
                        />
                        <ClientDetailsModal
                          show={modalClientDetailsShow}
                          onHide={onCloseDetailModal}
                          client={el}
                        />
                      </td>
                      <td>
                        <EditClientModal
                          client={el}
                          inputSearchFocus={inputSearchFocus}
                          handleChangeResultsState={(data) =>
                            setResultsSearch(data)
                          }
                          resultsSearch={resultsSearch}
                          getClientByNameOrPhone={() =>
                            getClientByNameOrPhone()
                          }
                        />
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </Table>
          <div>
            <ReactPaginate
              breakLabel='...'
              nextLabel={<GrFormNext />}
              onPageChange={handlePageClickUsersList}
              pageRangeDisplayed={5}
              pageCount={pageCount}
              previousLabel={<GrFormPrevious />}
              renderOnZeroPageCount={null}
              containerClassName={styles.containerPagination}
              pageClassName={styles.pagePagination}
              pageLinkClassName={styles.pageLinkPagination}
              activeClassName={styles.activePagination}
              activeLinkClassName={styles.activeLinkPagination}
              breakClassName={styles.breakPagination}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
