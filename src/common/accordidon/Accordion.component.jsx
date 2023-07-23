
const Accordion = ({ id, label, children }) => <>
    <div className="accordion" id={`accordion${id}`}>
        <div className="accordion-item">
            <h2 className="accordion-header" id={`heading${id}`}>
                <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#collapse${id}`}
                    aria-expanded="true"
                    aria-controls="collapseOne"
                >
                    {label}
                </button>
            </h2>
            <div
                id={`collapse${id}`}
                className="accordion-collapse collapse"
                aria-labelledby={`heading${id}`}
                data-bs-parent={`#accordion${id}`}
            >
                <div>
                    {children}
                </div>
            </div>
        </div>
    </div>
</>

export default Accordion