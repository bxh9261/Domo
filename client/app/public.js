const DomoList = function(props) {
    if(props.domos.length === 0){
        return (
            <div className="domoList">
                <h3 className="emptyDomo">No Domos yet</h3>
            </div>
        );
    }
    
    const domoNodes = props.domos.map(function(domo){
        return (
            <div key={domo._id} className="domo">
                <img src="/assets/img/domoface.jpeg" alt="domo face" className="domoFace" />
                <h3 className="domoName">Name: {domo.name}</h3>
                <h3 className="domoAge">Age: {domo.age}</h3>
                <h3 className="domoColor">Favroite Color: {domo.color}</h3>
            </div>
        );
    });
    return (
        <div className="domoList">
            {domoNodes}
        </div>
    );
};

const loadDomosFromServer = () => {
    sendAjax('GET', '/getPublicDomos', null, (data) => {
        ReactDOM.render(
            <PublicDomoList domos={data.domos} />, document.querySelector("#domos")
        );
    });
};

const setup = function(csrf) {
    ReactDOM.render(
        <PublicDomoList domos={[]} />, document.querySelector("#domos")
    );
    
    loadPublicDomosFromServer();
};

const getToken = () => {
    sendAjax('GET', "/getToken", null, (result) => {
       setup(result.csrfToken); 
    });
};

$(document).ready(function() {
   getPublicToken(); 
});