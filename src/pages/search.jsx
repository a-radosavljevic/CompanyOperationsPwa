import SearchContainer from "../components/search/search.component";
import { ErrorMessage } from "../utils/messager";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { SearchDocumentDTO } from "../api/models.ts";
import http from "../api/http";
import { baseURL } from "../api/http";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { Link } from "react-router-dom";
import { MainContainer } from "../common/layout/Layout.style";

const Search = () => {
  const searchObject = useRef(new SearchDocumentDTO());
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    searchDocuments();
  }, []);

  const handleChange = (name, value) => (searchObject.current[name] = value);

  const searchDocuments = async () => {
    let response = await http.post("/Document/search", searchObject.current, {
      headers: {
        "Content-Type": "application/json-patch+json",
      },
    });
    if (response.status === 200) {
      setDocuments(response.data);
    } else {
      ErrorMessage("Došlo je do neočekivane greške", "", () =>
        window.location.reload()
      );
    }
  };

  const handleReset = () => {
    searchObject.current = new SearchDocumentDTO();
    searchDocuments();
  };

  const columns = [
    {
      Header: "Naziv",
      accessor: "title",
    },
    {
      accessor: "delete",
      className: "two-buttons-column",
      Cell: ({ row }) => {
        return (
          <>
            <Link
              className="btn btn-primary table-btn m-r-5"
              to={`/Preview?id=${row.original.id}`}
            >
              <FontAwesomeIcon icon={solid("search")} />
            </Link>
            <a
              href={baseURL + `/Document/download?id=${row.original.id}`}
              className="btn btn-primary table-btn"
              type="button"
            >
              <FontAwesomeIcon icon={solid("download")} />
            </a>
          </>
        );
      },
    },
  ];

  return (
    <>
      <MainContainer className="slide-up-anim">
        <h2>Pretraga</h2>
      </MainContainer>
      <SearchContainer
        data={documents}
        columns={columns}
        handleChange={handleChange}
        searchDocuments={searchDocuments}
        handleReset={handleReset}
      />
    </>
  );
};

export default Search;
