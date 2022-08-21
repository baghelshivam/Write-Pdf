import React, { useState , useEffect } from "react";

import { useGetAllNotesQuery } from "../../features/notesApi";

import Note from "./Note";
import Header from "./Header";      //importing components
import Footer from "./Footer";
import PopupTemplate from "./Sizepopup";

const Notes = () => {
    const { data, error, isLoading } = useGetAllNotesQuery({},{refetchOnMountOrArgChange: true});     //invoking data from notes
    const [visibility, setVisibility] = useState(false);


    const addClicked = () => {
        setVisibility(e => !e);
    }

    useEffect(() => {
        document.getElementById("add").onclick = function (event) {
            addClicked();
        };
    }, []);


    return (
        <div>
            <Header />
            <PopupTemplate show={visibility} />
            {
                error ? (<p style={{ textAlign: "center", marginTop: "20em" }}>An error in fetching data.</p>) :
                    isLoading ? (<p style={{ textAlign: "center", marginTop: "20em" }}>Loding---</p>) :
                        (<>
                            <div className="notes">
                                {data?.map(note => <Note key={note._id} id={note._id} title={note.title} image={note.link} content={note.content} />)}
                            </div>
                        </>)}
            <Footer />
        </div>
    );
}

export default Notes;