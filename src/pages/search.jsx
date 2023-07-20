import SearchContainer from "../components/search/search.component";
import { ErrorMessage } from "../utils/messager";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { SearchDocumentDTO } from "../api/models.ts";
import http from "../api/http";

const Search = () => {
  const searchObject = useRef(new SearchDocumentDTO());
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    searchDocuments();
  }, [])

  const handleChange = (name, value) => searchObject.current[name] = value;

  const searchDocuments = async () => {
    let response = await http.post('/Document/search', searchObject.current, {
      headers: {
        'Content-Type': 'application/json-patch+json',
      }
    })
    if (response.status === 200) {
      setDocuments(response.data);
    }
    else {
      ErrorMessage('Došlo je do neočekivane greške', '', () => window.location.reload());
    }
  }

  const handleReset = () => {
    searchObject.current = new SearchDocumentDTO();
    searchDocuments();
  }

  return (
    <>
      <h2>Pretraga</h2>
      <SearchContainer data={documents} handleChange={handleChange} searchDocuments={searchDocuments} handleReset={handleReset} />
    </>
  );
};

export default Search;
