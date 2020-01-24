import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import AsyncCreatableSelect from 'react-select/async-creatable';
import axios from 'axios';
import DataTable, { defaultThemes } from 'react-data-table-component';
import '../Styles/Style.scss';

const GetDocs = () => {
    
    const [ selectedOption, setSelectedOption ] = useState(null);
    const [ id, setId ] = useState('');
    const [ name, setName ] = useState('');
    const [ docOption, setDocOption ] = useState([]);
    const [ option, setOption ] = useState([]);
    const [findRecord, setFindRecord] = useState('');
    const [ selectedDoc, setSelectedDoc ] = useState('');
    const [ docSearchOption, setDocSearchOption ] = useState([]);
    const [ pc , setPc ] = useState('');
    const [ pcVar, setPcVar ] = useState(false);
    const [ selectedRecordDoc, setSelectedRecordDoc ] = useState('');
    const [ selectedDocOption, setSelectedDocOption ] = useState([]);
    const [ ImgBack, setImgBack ] = useState('');
    const [ ImgFront, setImgFront ] = useState('');

    useEffect( () => {

        findByNameFunc();
        AllDocsData();

    }, [] );
    
    const stylesForFindByName = {

        control : () => ({
            
            textAlign:'center',
            marginTop : '-0.6rem',
            marginLeft:'6rem',
            display:'flex',
            border:'none',
            borderRadius:'4rem',
            width: '20rem',
            fontSize : '10.5pt',
            textAlign:'center',
            textAlignLast: 'center'
        }),
        dropdownIndicator : () => ({
            
            float:'right',
            color:'black',
            marginLeft:'5px',
            padding:'5px',
            marginRight:'0rem',               
        }),
        placeholder : () => ({
            color:'black'
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
            width: '14rem',
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

    const stylesForFindDocs2 = {

        control : () => ({
            
            marginTop : '-0.6rem',
            marginLeft:'2rem',
            display:'flex',
            border:'none',
            borderRadius:'4rem',
            width: '13rem',
            fontSize : '10.5pt',
        }),
        dropdownIndicator : () => ({
            
            float:'right',
            color:'black',
            marginLeft:'5px',
            padding:'5px',
            marginRight:'0rem',             
        })  
    };

    const getDataByName = ( selectedOption ) => {

        setId('');
        setPcVar( false );
        setSelectedOption( selectedOption );
        setSelectedDoc('');
        setSelectedRecordDoc('');
        selectedDocOption.length = 0;
        docOption.length = 0;
        let tempRecordDocs = [];
        let tempDocs = [];
        if( selectedOption !== null ){

            axios.post( '/Doc/getDocHolder', { ID: selectedOption.ID } )
                .then( res => {
                    setId( res.data.ID );
                    setFindRecord('');
                    
                    if( res.data.Docs.length !== 0 ){
    
                        for(let i = 0; i < res.data.Docs.length; i++ ){
    
                            tempDocs[i] = { 
                                
                                id: `${i}`, 
                                partyName: res.data.Name,
                                radio: <input type = 'radio' name = 'docs' value = { `${res.data.ID }+${res.data.Docs[i].Name}+${res.data.Docs[i].repeatVar}`} onChange = { getPic }/>, 
                                docName: (res.data.Docs[i].Name) ? `${ res.data.Docs[i].Name }`: ' No Name ',
                                docNo: (res.data.Docs[i].Remarks) ? `${ res.data.Docs[i].Remarks }`: ' No Remarks',
                                auth: (res.data.Docs[i].Auth) ? `${ res.data.Docs[i].Auth }`: ' No Authority Given '
                            }
                        };
                    }
                    setDocOption( docOption.concat(tempDocs) );
                    
                if( res.data.DocNames.length !== 0 ){

                    for(let i = 0; i < res.data.DocNames.length; i++ ){

                        tempRecordDocs[i] = { value:`${ res.data.DocNames[i] }`, label:`${ res.data.DocNames[i] }`, id: `${ res.data.ID }`};
                    };
                }
                setSelectedDocOption( selectedDocOption.concat(tempRecordDocs) );
            });
        }
    };

    const Fetch = () => {

        setSelectedOption('');
        setSelectedDoc('');
        setSelectedRecordDoc('');
        docOption.length = 0;
        selectedDocOption.length = 0;
        let tempDocs = [];
        let tempRecordDocs = [];

        axios.post( '/Doc/getDocHolder', { ID : findRecord } )
            .then( res => {

                setId( res.data.ID );
                setFindRecord('');
                setPc( res.data.Name );
                setPcVar( true );    
                
                if( res.data.Docs.length !== 0 ){

                    for(let i = 0; i < res.data.Docs.length; i++ ){

                        tempDocs[i] = { 
                            
                            id: `${i}`, 
                            partyName: res.data.Name,
                            radio: <input type = 'radio' name = 'docs' value = { `${ res.data.ID }+${res.data.Docs[i].Name}+${res.data.Docs[i].repeatVar}`} onChange = { getPic }/>, 
                            docName: (res.data.Docs[i].Name) ? `${ res.data.Docs[i].Name }`: 'No Name ',
                            docNo: (res.data.Docs[i].Remarks) ? `${ res.data.Docs[i].Remarks }`: ' No Remarks ',
                            auth: (res.data.Docs[i].Auth) ? `${ res.data.Docs[i].Auth }`: ' No Authority Given '
                        }
                    };
                }
                setDocOption( docOption.concat(tempDocs) ); 
                
                if( res.data.DocNames.length !== 0 ){

                    for(let i = 0; i < res.data.DocNames.length; i++ ){

                        tempRecordDocs[i] = { value:`${ res.data.DocNames[i] }`, label:`${ res.data.DocNames[i] }`, id: `${ res.data.ID }`};
                    };
                }
                setSelectedDocOption( selectedDocOption.concat(tempRecordDocs) );
            });
    };  
    
    const getSelectedDocDetails = ( selectedRecordDoc ) => {

        setSelectedRecordDoc(selectedRecordDoc);
        docOption.length = 0;
        
        if( selectedRecordDoc !== null ) {
            axios.post('/Record/Details', {DocName: selectedRecordDoc.value, ID: selectedRecordDoc.id })
            .then( res => {

                let tempDocs = [];

                if( res.data.Docs.length !== 0 ){

                    for(let i = 0; i < res.data.Docs.length; i++ ){

                        tempDocs[i] = { 
                            
                            id: `${i}`, 
                            partyName: res.data.Name,
                            radio: <input type = 'radio' name = 'docs' value = { `${ res.data.ID }+${res.data.Docs[i].Name}+${res.data.Docs[i].repeatVar}`} onChange = { getPic }/>, 
                            docName: (res.data.Docs[i].Name) ? `${ res.data.Docs[i].Name }`: 'No Name ',
                            docNo: (res.data.Docs[i].Remarks) ? `${ res.data.Docs[i].Remarks }`: ' No Remarks ',
                            auth: (res.data.Docs[i].Auth) ? `${ res.data.Docs[i].Auth }`: ' No Authority Given '
                        }
                    };
                }
                setDocOption( docOption.concat(tempDocs) ); 
  
            });

        }
    };

    const getPic = (e) => {

        setImgFront('');
        setImgBack('');
        let someVar = e.target.value;
        axios.post('/Pic/DocPic', { data: someVar } )
            .then( res => {

                setImgFront( res.data.ImageOne );
                if( res.data.nextImageVar !== undefined && res.data.nextImageVar === true){

                    axios.get('/Pic/DocPic2')
                        .then( res => {

                            setImgBack( res.data.ImageTwo );
                        });
                }
            });
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

        docSearchOption.length = 0;

        axios.get('/All/DocsData')
            .then( res => {

                let tempArr = new Array( res.data.Docs.length );
        
                for( let i = 0; i < res.data.Docs.length; i++ ) {
                    tempArr[i] = { value: res.data.Docs[i], label: res.data.Docs[i], ID : res.data.Docs[i] };           
                }
                setDocSearchOption( docSearchOption.concat( tempArr ) );
            });
    };

    const columns = [

        {
            name : '',
            selector : 'radio',
            width: '50px',
            center: true
        },
        {
            name : ' Name ',
            selector : 'partyName',
            center: true,
            width: '10rem'
        },
        {
            name : 'Document Name',
            selector : 'docName',
            center: true,
            width: '12rem'
        },
        {
            name : 'Document Number / Remarks',
            selector: 'docNo',
            center: true,
            width: '32rem'
        },
        {
            name : 'Authority',
            selector:'auth',
            center: true,
            width: '15rem'
        }
    ];

    const customStyles = {
        header: {
          style: {
            minHeight: '30px',
            marginLeft: '16rem',
            textAlign: 'center'
          },
        },
        headRow: {
          style: {
            borderTopStyle: 'solid',
            borderTopWidth: '1px',
            borderTopColor: defaultThemes.default.divider.default,
            fontWeight: 'bold'
          },
        },
        headCells: {
          style: {
              fontWeight: 'bold',
              fontStyle: 'italic',
              fontSize:'12pt',
            '&:not(:last-of-type)': {
              borderRightStyle: 'solid',
              borderRightWidth: '1px',
              borderRightColor: defaultThemes.default.divider.default,
            },
          },
        },
        cells: {
          style: {
            '&:not(:last-of-type)': {
              borderRightStyle: 'solid',
              borderRightWidth: '1px',
              borderRightColor: defaultThemes.default.divider.default,
            },
          },
        },
      };

    const getDocDetails = ( selectedDoc ) => {
         
        setSelectedOption('');
        setId('');
        setPcVar( false );
        setSelectedDoc( selectedDoc );
        docOption.length = 0;
        setSelectedRecordDoc('');
        selectedDocOption.length = 0;

        if( selectedDoc !== null ) {

            axios.post('/Details/DocDetails', { DocName: selectedDoc.value } )
            .then( res => { console.log( res.data.SomeData );
                let tempDocs = [];

                for(let i = 0; i < res.data.SomeData.length; i++ ){

                    tempDocs[i] = {     
                        id: `${i}`, 
                        partyName: res.data.SomeData[i].Name,
                        radio: <input type = 'radio' name = 'docs' value = { `${res.data.SomeData[i].ID}+${res.data.SomeData[i].DocName}+${res.data.SomeData[i].repeatVar}`} onChange = { getPic }/>, 
                        docName: (res.data.SomeData[i].DocName) ? `${ res.data.SomeData[i].DocName }`: 'No Name ',
                        docNo: (res.data.SomeData[i].Remarks) ? `${ res.data.SomeData[i].Remarks }`: ' No Remarks ',
                        auth: (res.data.SomeData[i].Auth) ? `${ res.data.SomeData[i].Auth }`: ' No Authority Given '
                    } 
                };
                setDocOption( docOption.concat( tempDocs ) );          
            });
        }  
      };

      const closeRecord = () => {
            
            setId('');
            setFindRecord('');
            setSelectedOption('');
            setSelectedRecordDoc('');
            selectedDocOption.length = 0;
            setSelectedDoc('');
            docOption.length = 0;
            setPcVar(false);
            setImgBack('');
            setImgFront('');
      };

    return (
        <div id = "SearchDocContainer">
            <h1>
                Search Documents 
            </h1>
            <div id = 'GetDocsDivTwo' style= {{ marginBottom:'0.5rem'}}>
            <div id = "GetDocsFindDiv" style = {{marginTop:'0rem', marginBottom:'0.5rem',marginRight:'0.5rem',float:'right'}}>
                <label style = {{ fontWeight: 'bold', marginRight:'0.5rem', marginTop:'1rem'}}> Find Record : </label>
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
                </div>
                <div id = "SecondDiv">
                <fieldset id = "IdInDoc" style = {{marginRight:'1rem',width:'31px',marginLeft:'1rem'}} >
                        <legend> ID </legend>
                    <input
                        style = {{ width:'31px'}}
                        placeholder = "ID"
                        id = "IDInDoc"
                        type = "number"
                        name = "ID"
                        value = {id}
                        readOnly
                    />
                    </fieldset>
                    <fieldset style = {{width: '17rem',marginRight:'1rem'}}> 
                        <legend> Name </legend>
                    <Select 
                        isSearchable     
                        placeholder = { pcVar ? pc : ' Search Record By Names '}
                        value = { selectedOption }
                        onChange = { getDataByName }
                        options = { option }
                        maxMenuHeight = {140}
                        openMenuOnClick = { false }
                        styles = { stylesForFindByName }
                        isClearable
                    />
                    </fieldset>
                    <fieldset id = "DocId" style = {{ marginRight:'1rem', width:'10rem'}} >
                    <legend>Documents of Record</legend>
                    <Select 
                        id = "DocsID"
                        isSearchable     
                        placeholder = ' Documents of Record'
                        value = { selectedRecordDoc }
                        onChange = { getSelectedDocDetails }
                        options = { selectedDocOption }
                        maxMenuHeight = {140}
                        openMenuOnClick = { false }
                        styles = { stylesForFindDocs2 }
                        isClearable
                    />
                </fieldset>
                    <fieldset id = "DocId" style = {{ marginRight:'1rem'}} >
                    <legend>All Documents</legend>
                    <Select 
                        id = "DocsID"
                        isSearchable     
                        placeholder = ' Search Documents '
                        value = { selectedDoc }
                        onChange = { getDocDetails }
                        options = { docSearchOption }
                        maxMenuHeight = {140}
                        openMenuOnClick = { false }
                        styles = { stylesForFindDocs }
                        isClearable
                    />
                </fieldset>
                    </div>
            </div>
            
            <div style = {{width:'100%',maxHeight:'25vh', border:'1px solid black',overflow:'auto',marginBottom:'1rem' }}>
                <DataTable
                    style = {{ width: '100%', overflow:'hidden'}}
                    title = ' Document List '
                    columns = { columns }
                    data = { docOption }
                    dense   
                    customStyles = { customStyles }
                    selectableRowsHighlight = { true }
                    selectableRowsNoSelectAll = { true }
                    highlightOnHover
                    noDataComponent
                />
            </div>
            
            <div id = "DocPics" style = {{height:'46vh',boxShadow:'5pxx 10px 5px grey'}}>    
                        <div id = 'frontImg'>
                            <u><label id = "imgFlabel" > Image 1 </label></u>
                            <img 
                                id = "front"    
                                alt = 'Front' 
                                src = { ImgFront }
                                />
                        </div>
                        <div id = 'rearImg'>
                            <u><label id = "imgBlabel" > Image 2 </label></u>
                            <img 
                                style = {{}}
                                id = "back" 
                                alt = 'Back' 
                                src = { ImgBack } 
                               />
                        </div>
                    </div>
        </div>
    )
}

export default GetDocs;
