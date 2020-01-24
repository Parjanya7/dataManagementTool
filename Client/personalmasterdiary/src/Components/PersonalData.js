import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import axios from 'axios';
import '../Styles/Style.scss';

const PersonalData = () => {

    const [name, setName] = useState('');
    const [id, setId] = useState('');
    const [bloodGroup, setBloodGroup] = useState('');
    const [ bday, setBday ] = useState('');
    const [findRecord, setFindRecord] = useState('');
    const [edit, setEdit] = useState( true );
    const [mobileNo, setMobileNo] = useState('');
    const [city, setCity] = useState('');
    const [aadhar, setAadhar] = useState('');
    const [PAN, setPAN] = useState('');
    const [licence, setLicence] = useState('');
    const [votingCard, setVotingCard] = useState('');
    const [passportNo, setPassportNo] = useState('');
    const [addr, setAddr] = useState('');
    const [dist, setDist] = useState(null);
    const [state, setState] = useState('');
    const [phNo, setPhNo] = useState('');
    const [postal, setPostal] = useState('');
//  const [phCode, setPhCode] = useState('');
    const [img, setImg] = useState('');
    const [fetched, setFetched] = useState(false);
    const [selectedOption, setSelectedOption ] = useState(null);
    const [ option, setOption ] = useState([]);
    const [ prevImg, setPrevImg ] = useState('');
    const [ prevImgVar, setPrevImgVar ] = useState( false );

    useEffect( () => {

        axios.get('/Connection/connect')
            .then( res => setId( res.data.ID ));

        findByNameFunc();

    }, [] );

    //INSERT REQUEST
    const Insert = async() => {

        let insertData = createFormData();

        await axios.post('/Data/insert' , insertData ).then( res => {

            alert(`Record Created Successfully with ID: ${ res.data.ID } and Name: ${ res.data.Name }`);
        });

        await New(); 
    };

    //DELETE REQUEST
    const Delete = () => {

        axios.post('/Record/delete', {

            Id : id
        }).then( res => alert( `Successfully Delete Record with ID : ${ res.data } ` ) );

        New();
    };

    //UPDATE REQUEST
    const Update = async() => {

        if(fetched){

            let updatedData = createFormData();

            alert( updatedData.get('image') );

            await axios.post( '/UpdateRecord/update', updatedData )
                .then( res => alert( `Updated record with ID: ${res.data.ID}` ) );
    
            await New();
        }
    };

    //FETCH REQUEST
    const Fetch = () => {

        if(findRecord) {

            axios.post('/Fetch/data' , {

                Id : findRecord
            }).then( res => {

                if( res.data.img ===  null || res.data.img === undefined ) {
                 
                    setId( res.data.ID );
                    setName( res.data.Name );
                    setLicence( res.data.Licence );
                    setAadhar( res.data.AadharCardNo );
                    setAddr( res.data.Address );
                    setBday( res.data.Birthdate );
                    setBloodGroup( res.data.BloodGroup );
                    setCity( (res.data.City !== 'undefined') ? {value : `${res.data.City}` , label : `${res.data.City}`} : '');
                    setDist( (res.data.Dist !== 'undefined') ? {value : `${res.data.Dist}` , label : `${res.data.Dist}`} : '');
                    setMobileNo( res.data.MobileNo );
                    setPAN( res.data.PAN );
                    setVotingCard( res.data.VotingNo );
                    setPassportNo( res.data.PassportNo );
                    setPostal( res.data.PostalCode );
                    setState( (res.data.State!=='undefined') ? {value : `${res.data.State}` , label : `${res.data.State}`} : '');
                   //setPhCode( res.data.PhoneCode );
                    setImg('');
                    setPhNo( res.data.PhoneNo ); 
                    setFindRecord('');
                }

                else {

                    var base64Flag = 'data:image/jpeg;base64,'; 
                    var imageStr = arrayBufferToBase64( res.data.img.data );
                
                    setId( res.data.ID );
                    setName( res.data.Name );
                    setLicence( res.data.Licence );
                    setAadhar( res.data.AadharCardNo );
                    setAddr( res.data.Address );
                    setBday( res.data.Birthdate );
                    setBloodGroup( res.data.BloodGroup );
                    setCity( (res.data.City!=='undefined') ? {value : `${res.data.City}` , label : `${res.data.City}`} : '');
                    setDist( (res.data.Dist!=='undefined') ? {value : `${res.data.Dist}` , label : `${res.data.Dist}`} : '');
                    setMobileNo( res.data.MobileNo );
                    setPAN( res.data.PAN );
                    setVotingCard( res.data.VotingNo );
                    setPassportNo( res.data.PassportNo );
                    setPostal( res.data.PostalCode );
                    setState( (res.data.State!=='undefined') ? {value : `${res.data.State}` , label : `${res.data.State}`} : '');
                  //setPhCode( res.data.PhoneCode );
                    setPhNo( res.data.PhoneNo ); 
                    setImg( base64Flag + imageStr );

                    setFindRecord('');
                }
            setFetched( true );   
            }); 
        }
    };

/*    const editClick = () => {

        setEdit(!edit);
        if(!edit)document.getElementById('Name').focus();
    }; */

    const New = () => {

        axios.get('/Connection/connect')
            .then( res => setId( res.data.ID ));

        findByNameFunc();

        setName('');
        setImg('');
        setLicence('');
        setAadhar('');
        setAddr('');
        setBday('');
        setBloodGroup('');
        setCity('');
        setDist('');
        setMobileNo('');
        setPAN('');
        setVotingCard('');
        setPassportNo('');
        setPostal('');
        setState('');
      //setPhCode('');
        setPhNo('');
        setFindRecord('');
        setSelectedOption('');
        setPrevImg('');
        setPrevImgVar( false );
        option.length = 0;
    };

    const arrayBufferToBase64 = ( buffer ) => {
        
        var binary = '';

        var bytes = [].slice.call( new Uint8Array( buffer ) );
        
        bytes.forEach( ( b ) => binary += String.fromCharCode( b ) );
        
        return window.btoa(binary);
    };

    const createFormData = () => {

        const formdata = new FormData();

        formdata.set( 'ID' , id );
        formdata.set( 'Name' , name );
        formdata.set( 'Bday' , bday );
        formdata.set( 'BG' , bloodGroup );
        formdata.set( 'Mobile' , mobileNo );
        formdata.set( 'Aadhar' , aadhar );
        formdata.set( 'PAN' , PAN );
        formdata.set( 'Lic' , licence );
        formdata.set( 'Vot' , votingCard );
        formdata.set( 'Pass' , passportNo );
        formdata.set( 'Addr' , addr );
        formdata.set( 'Postal' , postal );
        formdata.set( 'City' , city.value );
        formdata.set( 'Dist' , dist.value );
        formdata.set( 'State' , state.value );
        formdata.set( 'Phone' , phNo );
        formdata.append('image', img );

        console.log( formdata.get('image') );
        
        return formdata;
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
    
 
    const getDataByName = ( selectedOption ) => {

        setSelectedOption( selectedOption );

        if(selectedOption !== null){
        axios.post('/FindData/getDataByName', { ID : selectedOption.ID } )
            .then( res => {

                if( res.data.img ===  null || res.data.img === undefined ) {
                 
                    setId( res.data.ID );
                    setName( res.data.Name );
                    setLicence( res.data.Licence );
                    setAadhar( res.data.AadharCardNo );
                    setAddr( res.data.Address );
                    setBday( res.data.Birthdate );
                    setBloodGroup( res.data.BloodGroup );
                    setCity( (res.data.City!=='undefined') ? {value : `${res.data.City}` , label : `${res.data.City}`} : '');
                    setDist( (res.data.Dist!=='undefined') ? {value : `${res.data.Dist}` , label : `${res.data.Dist}`} : '');
                    setMobileNo( res.data.MobileNo );
                    setPAN( res.data.PAN );
                    setVotingCard( res.data.VotingNo );
                    setPassportNo( res.data.PassportNo );
                    setPostal( res.data.PostalCode );
                    setState( (res.data.State!=='undefined') ? {value : `${res.data.State}` , label : `${res.data.State}`} : '');
                  //setPhCode( res.data.PhoneCode );
                    setPhNo( res.data.PhoneNo ); 
                    setFindRecord('');
                }

                else {

                    var base64Flag = 'data:image/jpeg;base64,'; 
                    var imageStr = arrayBufferToBase64( res.data.img.data );

                    console.log( res.data.City );
                    
                    console.log( res.data.Dist );


                    setId( res.data.ID );
                    setName( res.data.Name );
                    setLicence( res.data.Licence );
                    setAadhar( res.data.AadharCardNo );
                    setAddr( res.data.Address );
                    setBday( res.data.Birthdate );
                    setBloodGroup( res.data.BloodGroup );
                    setCity( (res.data.City!=='undefined') ? {value : `${res.data.City}` , label : `${res.data.City}`} : '');
                    setDist( (res.data.Dist!=='undefined') ? {value : `${res.data.Dist}` , label : `${res.data.Dist}`} : '');
                    setMobileNo( res.data.MobileNo );
                    setPAN( res.data.PAN );
                    setVotingCard( res.data.VotingNo );
                    setPassportNo( res.data.PassportNo );
                    setPostal( res.data.PostalCode );
                    setState( (res.data.State!=='undefined') ? {value : `${res.data.State}` , label : `${res.data.State}`} : '');
                  //  setPhCode( res.data.PhoneCode );
                    setPhNo( res.data.PhoneNo ); 
                    setImg( base64Flag + imageStr );

                    setFindRecord('');
                }
        });
        setFetched( true );    
        }    };

    const prevImage = (e) => {

        //if(edit) {

            setImg( e.target.files[0] );
            setPrevImgVar( true );
            
            if( setPrevImgVar ) 
                setPrevImg(URL.createObjectURL(e.target.files[0])); 
        //}
    };

    const stylesForFindByName = {

        control : () => ({
                        
            display:'flex',
            border:'1px solid black',
            borderRadius:'4rem',
            boxShadow:'5px 5px 5px gray',
        }),
        dropdownIndicator : () => ({
            
            float:'right',
            color:'black',
            marginLeft:'5px',
            padding:'5px',
            marginRight:'10px'
        })  
    };

    const stylesForCity = {

        control : () => ({
                        
            display:'flex',
            height: '19pt',
            paddingTop: '0rem',
            marginLeft : '0rem',
            marginTop : '-0.4rem',
            fontSize : '10.5pt',
            paddingLeft: '1rem'
        }), 
        valueContainer : ( provided, state ) => ({ 
            ...provided,
//            border:'1px solid black',
            alignContent:'center',
            alignTextLast:'center',
            width: '90px',
            align: 'center',
            paddingLeft: '0rem',
            fontSize:'10.5pt'         
        }),
        dropdownIndicator : ( provided, state ) => ({
            ...provided,
            float:'right',
            color:'black',
            padding:'5px',
            marginRight:'-0.7rem'
        }),
        indicatorSeparator : () => ({ color: 'black'}),
        input : () => ({ textAlign:'center'}),
        placeholder : (provided) => ({ ...provided,marginLeft:'1rem'})
    };

    const optionCity = [
        { value : 'Bardoli', label: 'Bardoli' },
        { value : 'Surat', label: 'Surat' },
        { value : 'Bardoli', label: 'Bardoli' },
        { value : 'Bhuvnseshwar', label: 'Bhuvnseshwar' }
    ];

    return (
        
        <div id = "containerPersonalData">
            <div id = "upperline">
                <h3> Personal Information </h3>
                <b /*onClick = { editClick }*/ id = "edit"><u> Edit </u></b>
            </div>
            <div className = "formContainer">
            <form >
            
                <fieldset id = "Id">
                    <legend> ID </legend>
                <input
                    id = "ID"
                    type = "number"
                    name = "ID"
                    value = {id}
                    readOnly
                />
                </fieldset>
                <fieldset id = "name">
                <legend> Name </legend>
                <input 
                    placeholder = "Name"
                    type = "text" 
                    name = "Name" 
                    value = {name}
                    id = "Name" 
                    onChange = { e => { if(edit)setName( e.target.value )} }
                />
                </fieldset>
                <fieldset id = "bdate">
                <legend> Birth Date </legend>
                <input 
                    placeholder = "Birth Date"
                    type = "date" 
                    name = "BirthDate" 
                    value = {bday}
                    id = "Bdate" 
                    onChange = { e => { if(edit)setBday( e.target.value )} }
                />
                </fieldset>
                <fieldset id = "bg">
                <legend> Blood Group </legend>
                <select 
                    placeholder = 'Blood Group' 
                    name = "BloodGroup" 
                    value = { bloodGroup }
                    id = "bloodgroup" 
                    onChange = { e => { if(edit)setBloodGroup( e.target.value )} }
                >
                    <option value = "" disabled > Choose Group </option>
                    <option value = "A" id = "op"> A </option>
                    <option value = "B" id = "op"> B </option>
                    <option value = "C" id = "op"> O </option>
                </select>
                </fieldset>
                <fieldset id = "pic">
                    <legend>Photo</legend>
                    <input id = "img" type = "file" 
                        name = "picutre"
                        onChange = { prevImage }
                    />  
                    <img 
                        alt = ""
                        id = "image"
                        src = { ( prevImgVar ) ? prevImg : img }
                    />
                    <div id = "UploadDelte">
                        <u><label htmlFor = "img"  > Upload </label></u>
                        <u><label onClick = { () => { if(edit){setImg('');setPrevImg('') }}}> Delete </label></u>
                    </div>  
                </fieldset>
                <fieldset id = "mob">
                <legend> Mobile No </legend>
                <input 
                    placeholder = "Mobile No"
                    type = "tel" 
                    name = "mobile" 
                    value = {mobileNo}
                    id = "mobileNo" 
                    onChange = { e => { if(edit)setMobileNo( e.target.value )} }
                />
                </fieldset>
                <fieldset  id = "aadhar">
                <legend> Aadhar No </legend>
                <input 
                    placeholder = "Aadhar Card No"
                    type = "number" 
                    name = "Aadhar" 
                    value = {aadhar}
                    id = "Aadhar" 
                    onChange = { e => { if(edit)setAadhar( e.target.value )} }
                />
                </fieldset>
                <fieldset  id = "pan">
                <legend> PAN No </legend>
                <input 
                    placeholder = "PAN Card No"
                    type = "text" 
                    name = "PAN" 
                    value = {PAN}
                    id = "PAN" 
                    onChange = { e => { if(edit)setPAN( e.target.value )} }
                />
                </fieldset>
                <fieldset  id = "lic">
                <legend> Licence No</legend>
                <input 
                    placeholder = "Licence No"
                    type = "text" 
                    name = "Licence" 
                    value = {licence}
                    id = "Licence" 
                    onChange = { e => { if(edit)setLicence( e.target.value )} }
                />
                </fieldset>
                <fieldset  id = "vot">
                <legend> Voting Card No</legend>
                <input 
                    placeholder = "Voting Card No"
                    type = "text" 
                    name = "VotingCard" 
                    value = {votingCard}
                    id = "VotingCard" 
                    onChange = { e => { if(edit)setVotingCard( e.target.value )} }
                />
                </fieldset>
                <fieldset  id = "pass">
                <legend> Passport No</legend>
                <input 
                    placeholder = "Passport No"
                    type = "text" 
                    name = "PAN" 
                    value = {passportNo}
                    id = "Passport" 
                    onChange = { e => { if(edit)setPassportNo( e.target.value )} }
                />
                </fieldset>
                <fieldset  id = "address">
                <legend> Address </legend>
                <input 
                    placeholder = "Address"
                    type = "text" 
                    name = "Addr" 
                    value = {addr}
                    id = "Addr" 
                    onChange = { e => { if(edit)setAddr( e.target.value )} }
                />
                </fieldset>
                <fieldset  id = "postal">
                <legend> PIN Code </legend>
                <input 
                    placeholder = "Postal Code"
                    type = "number" 
                    name = "postalCode" 
                    value = {postal}
                    id = "postalcode" 
                    onChange = { e => { if(edit)setPostal( e.target.value )} }
                />
                </fieldset>
                <fieldset id = "city">
                <legend> City </legend>
               {/* <input 
                    placeholder = "City"
                    type = "text" 
                    name = "City" 
                    value = {city}
                    id = "City" 
                    onChange = { e => { if(edit)setCity( e.target.value )} }
               /> */}
                <Select
                    isSearchable     
                    placeholder = ' Search City '
                    value = { city }
                    onChange = { city => { if(edit)setCity(city) } }
                    options = { optionCity }
                    maxMenuHeight = {140}
                    openMenuOnClick = { false }
                    styles = { stylesForCity }
                >
                </Select>
                </fieldset>
                <fieldset  id = "dist">
                <legend> Dist </legend>
               {/* <input
                    placeholder = "District" 
                    type = "text" 
                    name = "Dist" 
                    value = {dist}
                    id = "Dist" 
                    onChange = { e => { if(edit)setDist( e.target.value )} }
               /> */}
               <Select
                    isSearchable     
                    placeholder = ' Search District '
                    value = { dist }
                    onChange = { dist => { if(edit)setDist(dist) }}
                    options = { optionCity }
                    maxMenuHeight = {140}
                    openMenuOnClick = { false }
                    styles = { stylesForCity }
                >
                </Select>
                </fieldset>
                <fieldset  id = "state">
                <legend> State </legend>
              {/*  <input 
                    placeholder = "State"
                    type = "text" 
                    name = "State" 
                    value = {state}
                    id = "State" 
                    onChange = { e => { if(edit)setState( e.target.value )} }
              /> */}
              <Select
                    isSearchable     
                    placeholder = ' Search State '
                    value = { state }
                    options = { optionCity }
                    onChange = { state => { setState(state) }}
                    maxMenuHeight = {140}
                    openMenuOnClick = { false }
                    styles = { stylesForCity }
                >
                </Select>
                </fieldset>
                {/*<fieldset  id = "phcode">
                <legend> Phone Code </legend>
                <input 
                    placeholder = "Phone Code"
                    type = "number" 
                    name = "phoneCode" 
                    value = {phCode}
                    id = "phonecode" 
                    onChange = { e => { if(edit)setPhCode( e.target.value )} }
                />
                </fieldset> */}
                <fieldset  id = "phnumber">
                <legend> TelePhone No </legend>
                <input 
                    placeholder = "Telephone number"
                    type = "tel" 
                    name = "Phone" 
                    value = {phNo}
                    id = "Phone" 
                    onChange = { e => { if(edit)setPhNo( e.target.value )} }
                /> 
                </fieldset>
                <fieldset id = "ButtonBar" >
                <label id = "findlabel"> Find Record : </label>
                <input
                    id = "find"
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
                    type = "button"
                    name = "new"
                    onClick = { New }
                >
                    New
                </button>
                <button
                    type = "button"
                    name = "Insert"
                    onClick = { Insert }
                > 
                    Insert 
                </button>
                <button 
                    type = "button"
                    name = "Delete"
                    onClick = { Delete }
                > 
                    Delete </button>
                <button 
                    type = "button"
                    name = "Update"
                    onClick = { Update }
                > 
                    Update 
                </button>
                </fieldset>
                <br/>
                    <b id = "findByName"> Find Record By Name </b>
                    <Select 
                        id = "selectID"
                        isSearchable     
                        placeholder = ' Search Record By Names '
                        value = { selectedOption }
                        onChange = { getDataByName }
                        options = { option }
                        maxMenuHeight = {140}
                        openMenuOnClick = { false }
                        styles = { stylesForFindByName }
                        isClearable
                    />           
            </form>
            </div>
        </div>
    )
}

export default PersonalData;
