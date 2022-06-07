function changeLanguage(logger) {
    var k = logger.target.value;
    document.getElementById('heading') === null ? {} : document.getElementById('heading').innerHTML = "Admin | " + language[k][1] + ": ";
    document.getElementById('button_add') === null ? {} : document.getElementById('button_add').innerHTML = language[k][2];
    document.getElementById('button_delete') === null ? {} : document.getElementById('button_delete').innerHTML = language[k][3];
    document.getElementById('button_search') === null ? {} : document.getElementById('button_search').innerHTML = language[k][4];
    document.getElementById('placeholder_input_search') === null ? {} : document.getElementById('placeholder_input_search').placeholder = language[k][4];
    document.getElementById('name_song') === null ? {} : document.getElementById('name_song').innerHTML = language[k][5];
    document.getElementById('genre_song') === null ? {} : document.getElementById("genre_song").innerHTML = language[k][6];
    document.getElementById('action_song') === null ? {} : document.getElementById("action_song").innerHTML = language[k][7];
    var buttons = document.getElementsByTagName('button');
    for (var i = 0; i < buttons.length; i++) {
        if (buttons[i].id.indexOf('play_song') != -1) {
            document.getElementById(buttons[i].id).innerHTML = language[k][8]
        }
        else if (buttons[i].id.indexOf('edit_song') != -1) {
            document.getElementById(buttons[i].id).innerHTML = language[k][9]
        }
    }
}

function PlaySong(props) {
    var t;
    var lang = props.lang;
    const [url, setUrl] = React.useState(t);
    React.useEffect(() => {
        axios.get('http://localhost:7000/get_song/' + props.data.id)
            .then(res => {
                var blob = new Blob([new Uint8Array(res.data)], { type: 'audio/mpeg' });
                var p = window.URL.createObjectURL(blob);
                console.log(p)
                console.log(res)
                setUrl(p);
            })
    }, [])

    return (
        <React.Fragment>
            <div className='container'>
                <div className='row'>
                    <audio
                        id='audio'
                        autoPlay
                        src={url}
                        controls
                        style={{ width: "100%" }}
                    >
                    </audio>
                </div>
                <div className='row'>
                    <h1>{language[lang][14]}</h1>
                </div>

            </div>
        </React.Fragment>
    );
}

function alo(logger) {
    //console.log(logger)
}
const language = {
    'eng': {
        1: "Language",
        2: "Add",
        3: "Delete",
        4: "Search",
        5: "Music Name",
        6: "Genre",
        7: "Action",
        8: "Play",
        9: "Edit",
        10: "Add Song",
        11: "No file chosen",
        12: "Back",
        13: "Enter name's song",
        14: "Song Details",
        15: "Last update",
        16: "Save",
        17: "Total items: ",
        18: "Enter genre's song",
        19: "Selected items: "

    },
    'vie': {
        1: "Ngôn ngữ",
        2: "Thêm",
        3: "Xóa",
        4: "Tìm Kiếm",
        5: "Tên bài hát",
        6: "Thể loại",
        7: "Hành động",
        8: "Chơi",
        9: "Sửa",
        10: "Thêm bài hát",
        11: "Không có tệp được chọn",
        12: "Trở lại",
        13: "Nhập tên bài hát",
        14: "Chi tiết bài hát",
        15: "Cập nhật lần cuối",
        16: "Lưu",
        17: "Tổng số bài hát",
        18: "Nhập thể loại bài hát",
        19: "Đã chọn"

    },
    'spa': {
        1: "Idioma",
        2: "Agregar",
        3: "Borrar",
        4: "Buscar",
        5: "Nombre de la música",
        6: "Género",
        7: "Acción",
        8: "Jugar",
        9: "Editar",
        10: "Añadir Canción",
        11: "No se ha elegido ningún archivo",
        12: "Atrás",
        13: "Introduzca la canción del nombre",
        14: "Detalles de la canción",
        15: "Última actualización",
        16: "Salvar",
        17: "Total de artículos: ",
        18: "Introduce la canción del género",
        19: "Elementos seleccionados"


    }
}
var id;

function CreateSelectItemTag(props) {
    let array = props.data
    var lang=props.lang;
    // if (array.length > 0) {
    // if (document.getElementById('slt') == null) {
    //     let label = document.createElement('label')
    //     label.textContent = 'Selected Items: ' + array.length;
    //     label.style.fontSize = "20px"
    //     label.id = 'lb'
    //     let td = document.createElement('div')
    //     td.id = 'slt'

    //     document.querySelector('#foot').appendChild(td)
    //     document.querySelector('#slt').appendChild(label)
    // }
    // else document.getElementById('lb').innerHTML = 'Selected Items: ' + array.length;
    return (
        <div>
            <label style={{ fontSize: "20px" }}>{language[lang][19]}: {array.length}</label>
        </div>
    );
    //   }
    // else {
    //     let parent = document.getElementById('foot');
    //     parent.removeChild(parent.firstChild)
    // }


}





function MainComponent(props) {
    var lang = props.lang;
    const [checked, setChecked] = React.useState([])
    const [checkedAll, setCheckedAll] = React.useState(false)

    const [play, setPlay] = React.useState(false)
    const [state, setState] = React.useState(false)

    const [currentSong, setCurrentSong] = React.useState({})
    const [stateWhenPlay, setStateWhenPlay] = React.useState(true)

    const [songs, setSongs] = React.useState([])

    const [toggle, setToggle] = React.useState(false)
    const [showAudio, setShowAudio] = React.useState(true)

    const [originalSongs, setOriginalSongs] = React.useState([])

    React.useEffect(() => {
        axios.get('http://localhost:7000/musicmanager')
            .then(res => {
                console.dir(res.data)

                setSongs(res.data);

            })

    }, [toggle])

    return (
        <React.Fragment>
            <div id='mess'></div>
            {!play && !state && (<div className="row">
                <div className="hstack gap-3">
                    <div className="bg-light border" id='aaa'>
                        <button
                            id='button_add'
                            data-toggle="modal" data-target="#exampleModalCenter"
                            onClick={() => {
                                setState(true)
                            }}
                            className="btn btn-outline-success"
                            type="submit"
                        >
                            {language[lang][2]}
                        </button>
                    </div>
                    <div className="bg-light border">
                        <button
                            id='button_delete'
                            onClick={() => {
                                axios.delete('http://localhost:7000/delete/' + checked)
                                    .then(res => {
                                        console.log(res)
                                        setChecked([])
                                        for (var i = 0; i < songs.length; i++) {
                                            var t = document.getElementById('check' + i)
                                            t.checked = false
                                        }
                                        document.getElementById('checkedAll').checked = false;
                                        document.getElementById('placeholder_input_search').value = ''
                                        setCheckedAll(false)
                                        setToggle(!toggle)

                                        let time = 0;
                                        let interval = setInterval(frame, 100);
                                        function frame() {
                                            if (time == 10) {
                                                document.getElementById('mess').removeChild(document.getElementById('mess').firstChild)
                                                clearInterval(interval);
                                            } else {
                                                time++;
                                                if (document.getElementById('message') == null) {
                                                    let m = document.createElement('div')
                                                    m.id = 'message'
                                                    m.role = "alert"
                                                    if (res) {
                                                        m.className = "alert alert-danger"
                                                        m.textContent = "Delete song successfully!"
                                                    }
                                                    else {
                                                        m.className = "alert alert-warning"
                                                        m.textContent = "Delete song unsuccessfully!"
                                                    }
                                                    document.querySelector('#mess').appendChild(m)
                                                }
                                            }
                                        }

                                    })

                            }}
                            className="btn btn-outline-success"
                            type="submit"
                            disabled={checked.length === 0}
                        >
                            {language[lang][3]}
                        </button>
                    </div>
                    <div className="bg-light border ms-auto">
                        <div className="d-flex" role="search">
                            <input
                                id='placeholder_input_search'
                                className="form-control me-2"
                                type="search"
                                placeholder="Search"
                                aria-label="Search"
                                onChange={() => {
                                    if (document.getElementById('placeholder_input_search').value.length === 0)
                                        setSongs(originalSongs)
                                }}
                            >
                            </input>
                            <div className="d-grid gap-2 col-5 mx-auto">
                                <button
                                    id='button_search'
                                    onClick={() => {
                                        var searchSong = document.getElementById('placeholder_input_search').value.toLowerCase();
                                        var tempSong = [];
                                        for (var i = 0; i < songs.length; i++) {
                                            if (songs[i].name.toLowerCase().includes(searchSong))
                                                tempSong.push(songs[i])
                                        }
                                        setOriginalSongs(songs)
                                        setSongs(tempSong);
                                    }}
                                    className="btn btn-outline-success"
                                    type="submit"
                                >
                                    {language[lang][4]}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>)}
            <div style={{ border: 3, borderStyle: "solid", marginTop: "15px", padding: 0 }}>
                {!state && play && (
                    <React.Fragment>
                        {showAudio && <PlaySong data={currentSong} lang={lang} />}
                        <div className='row'>
                            {stateWhenPlay ?
                                (<React.Fragment>

                                    <label style={{ margin: "10px", fontSize: "15px" }}><b>{language[lang][5]}: {stateWhenPlay ? currentSong.name : (<input type='text'></input>)}</b></label>
                                    <label style={{ margin: "10px", fontSize: "15px" }}><b>{language[lang][6]}: {stateWhenPlay ? currentSong.genre : (<input type='text'></input>)}</b></label>

                                </React.Fragment>)
                                : (
                                    <React.Fragment>
                                        <div className="input-group input-group-sm mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text" id="inputGroup-sizing-sm">{language[lang][5]}</span>
                                            </div>
                                            <input text={currentSong.name} placeholder={currentSong.name} id='updateName' type="text" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm"></input>
                                        </div>
                                        <div className="input-group input-group-sm mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text" id="inputGroup-sizing-sm">{language[lang][6]}</span>
                                            </div>
                                            <input text={currentSong.genre} placeholder={currentSong.genre} id='updateGenre' type="text" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm"></input>
                                        </div>

                                    </React.Fragment>
                                )
                            }
                            <label style={{ margin: "10px", fontSize: "15px" }}>{language[lang][15]}: {currentSong.updateTime}</label>
                        </div>
                        <div className="row" style={{ padding: "10px" }}>
                            <div className="col-9" style={{ marginTop: "20px" }}>
                                <button
                                    id='button_back'
                                    data-toggle="modal" data-target="#exampleModalCenter"
                                    onClick={() => {

                                        setPlay(false)
                                        setState(false)
                                        setStateWhenPlay(true)
                                    }}
                                    className="btn btn-outline-success"
                                    type="submit"
                                >
                                    {language[lang][12]}
                                </button>
                            </div>
                            <div className="col-5" style={{ width: "fit-content", margin: "20px" }}>
                                {stateWhenPlay ?
                                    (<button
                                        id='button_add'
                                        data-toggle="modal" data-target="#exampleModalCenter"
                                        onClick={() => {
                                            setStateWhenPlay(false)
                                        }}
                                        className="btn btn-outline-success"
                                        type="submit"
                                    >
                                        {language[lang][9]}
                                    </button>)
                                    : (<button
                                        id='button_save'
                                        data-toggle="modal" data-target="#exampleModalCenter"
                                        onClick={() => {
                                            var updateName = document.getElementById('updateName').value;
                                            var updateGenre = document.getElementById('updateGenre').value
                                            if (updateName != null || updateGenre != null) {
                                                var url = 'http://localhost:7000/update/' + currentSong.id;

                                                let currentTime = new Date()
                                                var time = currentTime.getFullYear()
                                                    + "-" + (currentTime.getMonth() + 1)
                                                    + "-" + currentTime.getDate()
                                                    + " " + currentTime.getHours()
                                                    + ":" + currentTime.getMinutes()
                                                    + ":" + currentTime.getSeconds()

                                                var temp = { id: currentSong.id, name: document.getElementById('updateName').value || currentSong.name, genre: document.getElementById('updateGenre').value || currentSong.genre, updateTime: time }


                                                setCurrentSong(temp)
                                                var tempSong = songs;
                                                tempSong[currentSong.id] = temp


                                                var formData = new FormData();
                                                formData.append("name", temp.name)
                                                formData.append("genre", temp.genre)
                                                formData.append("updateTime", time)


                                                axios.put(url, formData)
                                                    .then(() => setToggle(!toggle));
                                                
                                                setSongs(tempSong)
                                            }
                                            setStateWhenPlay(true)

                                        }}
                                        className="btn btn-outline-success"
                                        type="submit"
                                    >
                                        {language[lang][16]}
                                    </button>)}

                                <button
                                    style={{ marginLeft: "20px" }}
                                    id='button_delete'
                                    data-toggle="modal" data-target="#exampleModalCenter"


                                    onClick={() => {
                                        var formData = new FormData();

                                        formData.append("alo", "JSON.stringify([1,2,3])")
                                        axios.delete('http://localhost:7000/delete/' + currentSong.id)
                                            .then(() => {
                                                setToggle(!toggle)
                                                setPlay(false)
                                                setState(false)
                                                setStateWhenPlay(true)
                                                let time = 0;
                                                let interval = setInterval(frame, 100);
                                                function frame() {
                                                    if (time == 10) {
                                                        document.getElementById('mess').removeChild(document.getElementById('mess').firstChild)
                                                        clearInterval(interval);
                                                    } else {
                                                        time++;
                                                        if (document.getElementById('message') == null) {
                                                            let m = document.createElement('div')
                                                            m.id = 'message'
                                                            m.role = "alert"
                                                            if (res) {
                                                                m.className = "alert alert-danger"
                                                                m.textContent = "Delete song successfully!"
                                                            }
                                                            else {
                                                                m.className = "alert alert-warning"
                                                                m.textContent = "Delete song unsuccessfully!"
                                                            }
                                                            document.querySelector('#mess').appendChild(m)
                                                        }
                                                    }
                                                }
                                            }
                                            )
                                    }}
                                    className="btn btn-outline-success"
                                    type="submit"
                                >
                                    {language[lang][3]}
                                </button>

                            </div>

                        </div>
                    </React.Fragment>)}
                {!play && !state && (<React.Fragment>
                    <div className="tableFixHead" style={{ overflowY: "auto", maxHeight: "400px", padding: 0 }} >
                        <table className="table_data" style={{ width: '100%', scrollY: "200px", "scrollCollapse": true, }}>
                            <thead>
                                <tr style={{ width: '100%', textAlign: "center", borderBottom: 1,borderStyle: "solid"}}>
                                    <th style={{ paddingTop: "5px", paddingBottom: "5px"}}>
                                        <input
                                            id='checkedAll'
                                            className="form-check-input"
                                            type='checkbox'
                                            onClick={() => {
                                                for (var i = 0; i < songs.length; i++) {
                                                    var t = document.getElementById('check' + i)
                                                    if (checkedAll)
                                                        t.checked = false
                                                    else t.checked = true
                                                }
                                                var temp = []
                                                if (!checkedAll) {
                                                    for (var i = 0; i < songs.length; i++)
                                                        temp.push(songs[i].id)
                                                }
                                                setCheckedAll(!checkedAll)
                                                setChecked(temp)
                                            }}
                                        >
                                        </input>
                                    </th>
                                    {/* <th>ID</th> */}
                                    <th id='name_song' style={{ textAlign: "center", borderBottom: 1,borderStyle: "solid" , paddingTop: "5px", paddingBottom: "5px"}}>{language[lang][5]}</th>
                                    <th id='genre_song' style={{ textAlign: "center", borderBottom: 1,borderStyle: "solid", paddingTop: "5px", paddingBottom: "5px"}}>{language[lang][6]}</th>
                                    <th id='action_song' style={{ textAlign: "center", borderBottom: 1,borderStyle: "solid", paddingTop: "5px", paddingBottom: "5px"}}>{language[lang][7]}</th>
                                </tr>
                            </thead>
                            <tbody id='bodyTable'>
                                {
                                    songs.map((e, index) =>
                                        <tr id={'row' + index} key={'row' + index} style={{ width: '100%' }}>
                                            <td style={{ width: "50px", textAlign: "center", borderBottom: 1,borderStyle: "solid", paddingTop: "5px", paddingBottom: "5px" }}>
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    value="{songs.indexOf(e)}"
                                                    id={'check' + index}
                                                    onClick={() => {
                                                        if (checked.includes(e.id)) {
                                                            checked.splice(checked.indexOf(e.id), 1)
                                                            document.getElementById('checkedAll').checked = false;
                                                            setCheckedAll(false)
                                                        }
                                                        else checked.push(e.id);
                                                        if (checked.length === songs.length) {
                                                            document.getElementById('checkedAll').checked = true;
                                                            setCheckedAll(true)
                                                        }
                                                        console.log(checked)
                                                        setChecked([].concat(checked))
                                                    }}>
                                                </input>
                                            </td>
                                            {/* <td style={{ textAlign: "center" }}>{e.id}</td> */}
                                            <td style={{ textAlign: "center", borderBottom: 1,borderStyle: "solid", paddingTop: "5px", paddingBottom: "5px"}}> {e.name}</td>
                                            <td style={{ textAlign: "center", borderBottom: 1,borderStyle: "solid", paddingTop: "5px", paddingBottom: "5px"}}>{e.genre}</td>
                                            <td style={{ textAlign: "center", borderBottom: 1,borderStyle: "solid", paddingTop: "5px", paddingBottom: "5px"}}>
                                                <button
                                                    id={'play_song' + e.id}
                                                    style={{ marginRight: "10px" }}
                                                    className="btn btn-outline-success"
                                                    type="submit"
                                                    key={'play' + index}
                                                    onClick={() => {
                                                        setPlay(true)
                                                        setCurrentSong(e)
                                                        setShowAudio(true)
                                                    }
                                                    }
                                                >
                                                    {language[lang][8]}
                                                </button>
                                                <button
                                                    id={'edit_song' + e.id}
                                                    style={{ marginLeft: "10px" }}
                                                    key={'edit' + index}
                                                    onClick={() => {

                                                        setCurrentSong(e)
                                                        setShowAudio(false)
                                                        setStateWhenPlay(false)
                                                        setState(false)
                                                        setPlay(true)
                                                    }}
                                                    className="btn btn-outline-success"
                                                    type="submit"
                                                >
                                                    {language[lang][9]}
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                    <div colSpan="5">
                        <label style={{ fontSize: "20px", paddingTop: "20px" }} >{language[lang][17]}: {songs.length}</label>
                    </div>
                    <div id='foot' >
                        {
                            (checkedAll || checked.length > 0) && <CreateSelectItemTag data={checked} lang={lang}/>
                        }
                    </div>

                </React.Fragment>)}
                {state && (<React.Fragment>
                    <ComponentB lang={lang} />
                    <div className="row" style={{ padding: "10px" }}>
                        <div className="hstack gap-3" style={{ marginTop: "20px" }}>
                            <div className="bg-light border" id='aaa'>
                                <button
                                    id='button_back'
                                    data-toggle="modal" data-target="#exampleModalCenter"
                                    onClick={() => {
                                        setState(false)
                                    }}
                                    className="btn btn-outline-success"
                                    type="submit"
                                >
                                    {language[lang][12]}
                                </button>
                            </div>
                            <div className="bg-light border ms-auto">
                                <div className="bg-light border" id='aaa'>
                                    <button
                                        id='button_add_song'
                                        data-toggle="modal" data-target="#exampleModalCenter"
                                        onClick={() => {
                                            if (document.getElementById('nameSong').value === '')
                                                document.getElementById('nameSong').setAttribute("required", true)
                                            else if (fileMusic === null) {
                                                // let label=document.createElement('label').textContent="Error"
                                                // document.querySelector('#inputFile').appendChild(label)
                                                let parent = document.getElementById('slt');
                                                if (parent != null) parent.removeChild(parent.firstChild)

                                                let label = document.createElement('label')
                                                label.textContent = 'File is empty';
                                                label.style.color = 'red'
                                                label.id = 'lb'
                                                let td = document.createElement('div')
                                                td.id = 'slt'

                                                document.querySelector('#inputFile').appendChild(td)
                                                document.querySelector('#slt').appendChild(label)
                                            }
                                            else if (!fileMusic.type.includes("audio")) {
                                                let parent = document.getElementById('slt');
                                                if (parent != null) parent.removeChild(parent.firstChild)

                                                let label = document.createElement('label')
                                                label.textContent = 'Not an audio format';
                                                label.style.color = 'red'
                                                label.id = 'lb'
                                                let td = document.createElement('div')
                                                td.id = 'slt'

                                                document.querySelector('#inputFile').appendChild(td)
                                                document.querySelector('#slt').appendChild(label)
                                            }
                                            else {

                                                const reader = new FileReader();
                                                const fileByteArray = [];
                                                reader.readAsArrayBuffer(fileMusic);
                                                reader.onloadend = (evt) => {
                                                    if (evt.target.readyState === FileReader.DONE) {
                                                        const arrayBuffer = evt.target.result,
                                                            array = new Uint8Array(arrayBuffer);
                                                        for (const a of array) {
                                                            fileByteArray.push(a);
                                                        }
                                                        console.log(fileByteArray)
                                                    }
                                                }
                                                var url = 'http://localhost:7000/add';
                                                let currentTime = new Date()
                                                var time = currentTime.getFullYear()
                                                    + "-" + currentTime.getMonth()
                                                    + "-" + currentTime.getDate()
                                                    + " " + currentTime.getHours()
                                                    + ":" + currentTime.getMinutes()
                                                    + ":" + currentTime.getSeconds()
                                                var formData = new FormData();
                                                formData.append("name", document.getElementById("nameSong").value)
                                                formData.append("genre", document.getElementById("genreSong").value)
                                                formData.append("file", fileMusic);
                                                formData.append("updateTime", time)

                                                axios.post(url, formData)
                                                    .then(res => {
                                                        console.log(res)
                                                        setToggle(!toggle)
                                                        setPlay(false)
                                                        setState(false)
                                                        let time = 0;
                                                        let interval = setInterval(frame, 100);
                                                        function frame() {
                                                            if (time == 10) {
                                                                document.getElementById('mess').removeChild(document.getElementById('mess').firstChild)
                                                                clearInterval(interval);
                                                            } else {
                                                                time++;
                                                                if (document.getElementById('message') == null) {
                                                                    let m = document.createElement('div')
                                                                    m.id = 'message'
                                                                    m.role = "alert"
                                                                    if (res) {
                                                                        m.className = "alert alert-primary"
                                                                        m.textContent = "Add song successfully!"
                                                                    }
                                                                    else {
                                                                        m.className = "alert alert-warning"
                                                                        m.textContent = "Add song unsuccessfully!"
                                                                    }
                                                                    document.querySelector('#mess').appendChild(m)
                                                                }
                                                            }
                                                        }

                                                    });
                                            }
                                        }}
                                        className="btn btn-outline-success"
                                        type="submit"
                                    >
                                        {language[lang][2]}
                                    </button>
                                </div>

                            </div>
                        </div>

                    </div>
                </React.Fragment>)
                }
            </div >
        </React.Fragment >
    );
}




function App() {
    return (
        <Home />
    );
}


function Home() {
    const [lang, setLanguage] = React.useState('eng')
    return (
        <div className="container">
            <div className="row">
                <div style={{ margin: "20px" }}>
                    <select
                        onChange={(e) => { setLanguage(e.target.value) }}
                        style={{ float: "right", width: "fit-content" }}
                        className="form-select"
                        aria-label="Default select example"
                    >
                        <option value="eng">English</option>
                        <option value="vie">Tiếng Việt</option>
                        <option value="spa">Español</option>
                    </select>
                    <h2 id="heading" style={{ "marginLeft": "10px", float: "right" }}>Admin | {language[lang][1]}:</h2>
                    <img
                        style={{ float: "right" }}
                        src="https://rgl.mobi/IFScD"
                        alt="avatar" srcSet=""
                        width="32.59px"
                        height="32.59px">
                    </img>
                </div>
            </div>
            <MainComponent lang={lang} />
        </div>
    );
}


var fileMusic = null;
function ComponentB(props) {
    var lang = props.lang;
    return (
        <div className="container" >
            <div className="row">
                <h1 style={{ margin: "5px" }}>{language[lang][10]}</h1>
                <form className="was-validated">
                    <div className="form-group">
                        <label htmlFor="validationTextarea">{language[lang][5]}</label>
                        <textarea className="form-control is-invalid" id="nameSong" placeholder={language[lang][13]} ></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="validationTextarea">{language[lang][6]}</label>
                        <textarea className="form-control is-invalid" id="genreSong" placeholder={language[lang][18]} ></textarea>
                    </div>
                    <div className="custom-file" style={{ marginTop: "10px" }} id='inputFile'>
                        <input
                            style={{ width: "100%" }}
                            type="file"
                            className="custom-file-input"
                            accept="audio/*"
                            id="sourceFile"
                            name="asdhjbn"
                            required={false}
                            onChange={(e) => {
                                const selectedFile = e.target.files[0];
                                fileMusic = selectedFile;
                                let parent = document.getElementById('slt');
                                if (parent != null && fileMusic != null && fileMusic.type.includes("audio")) parent.removeChild(parent.firstChild)
                            }}></input>

                    </div>

                </form>
            </div>


        </div>

    );
}


const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);
root.render(<App />)