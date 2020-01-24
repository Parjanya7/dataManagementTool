import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import axios from 'axios';
import AsyncCreatableSelect from 'react-select/async-creatable';
import '../Styles/Style.scss';
const Docs = () => {

    const [id, setId] = useState('');
    const [mobileNo, setMoblieNO] = useState('');
    const [selectedOption, setSelectedOption ] = useState(null);
    const [ option, setOption ] = useState([]);
    const [findRecord, setFindRecord] = useState('');
    const [ imgFront, setImgFront ] = useState('');
    const [ imgBack, setImgBack ] = useState('');
    const [ prevImgFront, setPrevImgFront ] = useState('');
    const [ prevImgBack, setPrevImgBack ] = useState('');
    const [ selectedDoc, setSelectedDoc ] = useState('');
    const [ docOption, setDocOption ] = useState([]);
    const [ remarks , setRemarks ] = useState('');
    const [ auth, setAuth ] = useState('');
    const [ impDate, setImpDate ] = useState('');
    const [ pc , setPc ] = useState('');
    const [ pcVar, setPcVar ] = useState(false);

    useEffect( () => {

        findByNameFunc();

    }, [] );

    const stylesForFindByName = {

        placeholder : () => ({

            color: 'black'
        }),
        
        control : () => ({
            
            textAlign:'center',
            marginTop : '-0.8rem',
            marginLeft:'11rem',
            display:'flex',
            border:'none',
            borderRadius:'4rem',
            width: '24rem',
            fontSize : '10.5pt'
        }),
        dropdownIndicator : () => ({
            
            float:'right',
            color:'black',
            marginLeft:'5px',
            padding:'5px',
            marginRight:'10px',
        })  
    };

    const stylesForFindDocs = {

        control : () => ({
            
            textAlign:'center',
            marginTop : '-0.6rem',
            marginLeft:'2rem',
            display:'flex',
            border:'none',
            borderRadius:'4rem',
            width: '17rem',
            fontSize : '10.5pt'
        }),
        dropdownIndicator : () => ({
            
            float:'right',
            color:'black',
            marginLeft:'5px',
            padding:'5px',
            marginRight:'0rem',             
        })  
    };

    const findByNameFunc = () => {

        option.length = 0;

        let theVar = '';        
        
        axios.post('/Find/findByName', { keyWord : theVar } )
            .then( res => {

                let names = new Array( res.data.length );

                for( let i = 0; i < res.data.length; i++ ) {
                    names[i] = { value: res.data[i].Name, label: res.data[i].Name, ID : res.data[i].ID };           
            }
                setOption( option.concat( names ) );
        });
    };   

    const AllDocsData = () => {

        docOption.length = 0;

        axios.get('/All/DocsData')
            .then( res => {

                let tempArr = new Array( res.data.Docs.length );
        
                for( let i = 0; i < res.data.Docs.length; i++ ) {
                    tempArr[i] = { value: res.data.Docs[i], label: res.data.Docs[i], ID : res.data.Docs[i] };           
                }
                setDocOption( docOption.concat( tempArr ) );
            });
    };

    const getDataByName = ( selectedOption ) => {

        docOption.length = 0;
        setSelectedOption( selectedOption );

        let tempDocs = [];
        if( selectedOption !== null ){

            axios.post( '/Doc/getDocHolder', { ID: selectedOption.ID } )
                .then( res => {

                    setId( res.data.ID );
                    setMoblieNO( res.data.Mob );
                });
            AllDocsData();
        }   
    };    

    const Fetch = () => {

        docOption.length = 0;
        let tempDocs = [];
        setSelectedOption('');
//        setPcVar(false);
        axios.post( '/Doc/getDocHolder', { ID : findRecord } )
            .then( res => {

                setId( res.data.ID );
                setMoblieNO( res.data.Mob );
                setPc( res.data.Name );
                setPcVar( true );
                setFindRecord('');
            });
        AllDocsData();    
    };

    const prevFront = (e) => {

        setImgFront( e.target.files[0] );
        setPrevImgFront(URL.createObjectURL(e.target.files[0]));
    };
    const prevRear = (e) => { 

        setImgBack( e.target.files[0] );
        setPrevImgBack(URL.createObjectURL(e.target.files[0]));
    };

    const closeRecord = () => {

        setId('');
        setMoblieNO('');
        setFindRecord('');
        setSelectedOption('');
        setSelectedDoc('');
        setImgBack('');
        setImgFront('');
        setPrevImgBack('');
        setPrevImgFront('');
        setPcVar( false );
    };

    const uploadDocs = () => {

        let formdataVar = new FormData();

        console.log( imgFront );
        console.log( imgBack );

        formdataVar.set('ID', id);
        formdataVar.set('DocName', selectedDoc.value );
        formdataVar.set('impDate', impDate );
        formdataVar.set('Remarks', remarks );
        formdataVar.set('Authority', auth );
        formdataVar.append('files',imgFront);
        formdataVar.append( 'files', imgBack );
        
        if( imgFront ) {
            formdataVar.set('Front', true );
            formdataVar.set('Back',false);
        }
        if( imgBack ) {
            formdataVar.set('Front', false );
            formdataVar.set('Back', true);
        }
        axios.post('/Upload/uploadDocs',  formdataVar  )
            .then( res => {

                alert( res.data.msg );
                setPrevImgFront('');
                setPrevImgBack('');
                setSelectedDoc('');
                setImpDate('');
                setRemarks('');
                setAuth('');
            });   
    };

    return (
        <div id = "DocsContainer">
            <div id = "upperlineOfDocs">
                <h1> Upload Documents </h1>
            </div>             
                <form className = 'DocFormContainer'>                   
                <div id = 'divisionOne'>
                <label style = {{ fontWeight: 'bold', marginRight:'0.5rem'}}> Find Record : </label>
                <input
                    id = 'findDoc'
                    type = "number" 
                    name = "Find" 
                    value = { findRecord } 
                    onChange = { e => setFindRecord(e.target.value) }  
                /> 
                <button 
                    type = "button"
                    name = "Fetch"
                    onClick = { Fetch }
                > 
                    Find
                </button>
                <button
                    type = 'button'
                    name = 'close'
                    onClick = { closeRecord }
                >
                    Close Record
                </button>
                <button
                    type = 'button'
                    name = 'close'
                    onClick = { uploadDocs }
                >
                    Upload Documents
                </button>
                </div>
                <div id = 'divisionTwo'>
                <fieldset id = "IdInDoc" style = {{marginRight:'1rem'}} >
                        <legend> ID </legend>
                    <input
                        placeholder = "ID"
                        id = "IDInDoc"
                        type = "number"
                        name = "ID"
                        value = {id}
                        readOnly
                    />
                    </fieldset>
                    <fieldset id = 'nameInDoc' style = {{marginRight:'1rem'}}> 
                        <legend> Name </legend>
                    <Select 
                        id = "selectID"
                        isSearchable     
                        placeholder = { pcVar  ? pc : ' Search By Name ' }
                        value = { selectedOption }
                        onChange = { getDataByName }
                        options = { option }
                        maxMenuHeight = {140}
                        openMenuOnClick = { false }
                        styles = { stylesForFindByName }
    
                       // isClearable
                    />
                    </fieldset>
                    <fieldset>
                    <legend> Mobile No </legend>
                    <input 
                        placeholder = "Mobile No"
                        type = "tel" 
                        name = "mobile" 
                        value = {mobileNo}
                        id = "mobileNo" 
                        readOnly
                    />
                    </fieldset>
                </div>
                <div id = 'divisionThree'>
                <fieldset id = "DocId" style = {{ marginRight:'1rem'}} >
                    <legend>Documents</legend>
                    <AsyncCreatableSelect 
                        id = "DocsID"
                        isSearchable     
                        placeholder = ' Search OR Enter Documents '
                        value = { selectedDoc }
                        onChange = { selectedDoc => { setSelectedDoc( selectedDoc ) }}
                        defaultOptions = { docOption }
                        maxMenuHeight = {140}
                        openMenuOnClick = { false }
                        styles = { stylesForFindDocs }
                        isClearable
                    />
                    </fieldset>
                    <fieldset style = {{ marginRight:'1rem'}}>
                        <legend> Important Date </legend>
                        <input 
                            type = 'date' 
                            placeholder = ' Important Date '
                            name = "importantDate" 
                            value = {impDate}
                            onChange = { e => setImpDate( e.target.value ) }
                            id = "impData" 
                        />
                    </fieldset>
                    <fieldset style = {{ width:'312px', marginRight:'1rem'}}>
                        <legend> Document / Important No. </legend>
                        <input 
                            type = 'input' 
                            placeholder = ' Remarks '
                            name = 'remarks'
                            value = {remarks}
                            onChange = { e => setRemarks( e.target.value )}
                            id = 'rem'
                            style = {{ width: '300px'}}
                        />
                    </fieldset>
                    <fieldset>
                        <legend> Issuing Authority </legend>
                        <input 
                            type = 'input' 
                            placeholder = ' Issued By '
                            name = 'authority'
                            value = { auth }
                            onChange = { e => setAuth( e.target.value ) }
                            id = 'auth'
                        />
                    </fieldset>
                </div>
                    <div id = "DocPics">    
                        <div id = 'frontImg'>
                            <u><label htmlFor = "imgF" id = "imgFlabel" > Image 1 </label></u>
                            <input 
                                id = "imgF" 
                                type = "file" 
                                name = "frontPicutre"
                                onChange = { prevFront }
                            />
                            <img 
                                id = "front" 
                                alt = 'Front' 
                                src = { prevImgFront }/>
                        </div>
                        <div id = 'rearImg'>
                            <u><label htmlFor = "imgB" id = "imgBlabel" > Image 2 </label></u>
                            <input 
                                id = "imgB" 
                                type = "file" 
                                name = "rearPicutre"
                                onChange = { prevRear }
                            />
                            <img 
                                id = "back" 
                                alt = 'Back' 
                                src = { prevImgBack } />
                        </div>
                    </div>

                </form>
            
        </div>
    )
}

export default Docs;
