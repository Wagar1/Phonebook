import './App.css'
import shallow from "zustand/shallow";
import useStore  from './stores/useStore';'../src/stores/useStore';
import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';

const getState = state => [
  state.stateData,
  state.getStateData,
  state.createAuth
];

const columns = [
  {
      name: 'Ad',
      selector: row => row.FIRSTNAME,
      sortable: true
  },
  {
      name: 'Soyad',
      selector: row => row.LASTNAME,
      sortable: true
  },
  {
    name: 'Departament',
    selector: row => row.DEPARTMENT !== '?' ? row.DEPARTMENT : "",
    width: '15vw',
    sortable: true
  },
  {
      name: 'Vəzifə',
      selector: row => row.TITLE,
      width: '15vw',
      sortable: true
  },
  {
      name: 'Email',
      selector: row => row.MAILADDRESS,
      width: '15vw',
      sortable: true
  },
  {
      name: 'Daxili telefon',
      selector: row => row.CONTACT !== '?' ? row.CONTACT : "" ,
      width: '10vw',
      sortable: true
  },
  {
      name: 'Mobil (iş)',
      selector: row => row.CELLULARPHONE !== '?' ? row.CELLULARPHONE : "",
      width: '10vw',
      sortable: true
  },
  {
      name: 'Mobil (şəxsi)',
      selector: row => row.HOMEPHONE !== '?' ? row.HOMEPHONE : "",
      width: '10vw',
      sortable: true
  }
];

const paginationComponentOptions = {
  rowsPerPageText: 'Rows per page',
  rangeSeparatorText: 'of',
  selectAllRowsItem: true,
  selectAllRowsItemText: 'Hamısı',
};

const customStyles = {
  headRow: {
    style: {
      background: 'linear-gradient(0deg, rgba(194,219,231,1) 40%, rgba(220,236,248,1) 90%)'
    }
  }
}


function App() {
  const [
    stateData,
    getStateData,
  ] = useStore(getState, shallow);
  const [internamlNumber, setInternalNumber] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [department, setDepartment] = useState('');
  const [position, setPosition] = useState('');
  const [cellularPhone, setCellularPhone] = useState('');
  const [homePhone, setHomePhone] = useState('');
  const [email, setEmail] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const getFromDB = async () => { 
    const data = await getStateData();
    setFilteredData(data.filter(item => item.CONTACT && item.CONTACT.toLowerCase().includes(internamlNumber.toLowerCase())));
  }
  useEffect(()=>{
    getFromDB();
  },[])
  const handleChange = (val) => {
    setInternalNumber(val);
    setFilteredData(stateData.filter(item => item.CONTACT && item.CONTACT.toLowerCase().includes(val.toLowerCase())));
  }
  const handleChangeFirstName = (val) => {
    setFirstName(val);
    setFilteredData(stateData.filter(item => item.FIRSTNAME && item.FIRSTNAME.toLowerCase().includes(val.toLowerCase())));
  }
  const handleChangeLastName = (val) => {
    setLastName(val);
    setFilteredData(stateData.filter(item => item.LASTNAME && item.LASTNAME.toLowerCase().includes(val.toLowerCase())));
  }
  const handleChangeDepartment = (val) => {
    setDepartment(val);
    setFilteredData(stateData.filter(item => item.DEPARTMENT && item.DEPARTMENT.toLowerCase().includes(val.toLowerCase())));
  }
  const handleChangePosition = (val) => {
    setPosition(val);
    setFilteredData(stateData.filter(item => item.TITLE && item.TITLE.toLowerCase().includes(val.toLowerCase())));
  }
  const handleChangeCellularPhone = (val) => {
    setCellularPhone(val);
    setFilteredData(stateData.filter(item => item.CELLULARPHONE && item.CELLULARPHONE.toLowerCase().includes(val.toLowerCase())));
  }
  const handleChangeHomePhone = (val) => {
    setHomePhone(val);
    setFilteredData(stateData.filter(item => item.HOMEPHONE && item.HOMEPHONE.toLowerCase().includes(val.toLowerCase())));
  }
  const handleChangeEmail = (val) => {
    setEmail(val);
    setFilteredData(stateData.filter(item => item.MAILADDRESS && item.MAILADDRESS.toLowerCase().includes(val.toLowerCase())));
  }
  return (
    <>
    <div className="container-fluid" style={{
      height: '60vh',
      width: '95vw',
      marginTop: '10px'
    }}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 text-center">
              <span className="header-text"><b>CIC daxili telefon nömrələri</b></span>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-4">
              <div className="input-group input-group-sm mb-2">
               <div className="input-group-prepend">
                 <span className="input-group-text">Ad</span>
               </div>
               <input type="text" value={firstName} onChange={e => handleChangeFirstName(e.target.value)} className="column_filter form-control-sm" />
              </div>
            </div>
            <div className="col-4">
              <div className="input-group input-group-sm mb-2">
               <div className="input-group-prepend">
                 <span className="input-group-text">Soyad</span>
               </div>
               <input type="text" value={lastName} onChange={e => handleChangeLastName(e.target.value)} className="column_filter form-control-sm" />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-4">
              <div className="input-group input-group-sm mb-3">
               <div className="input-group-prepend">
                 <span className="input-group-text">Dep</span>
               </div>
               <input type="text" value={department} onChange={e => handleChangeDepartment(e.target.value)} className="column_filter form-control-sm" />
              </div>
            </div>
            <div className="col-4">
              <div className="input-group input-group-sm mb-2">
               <div className="input-group-prepend">
                 <span className="input-group-text">Vəzifə</span>
               </div>
               <input type="text" value={position} onChange={e => handleChangePosition(e.target.value)} className="column_filter form-control-sm" />
              </div>
            </div>
            <div className="col-4">
              <div className="input-group input-group-sm mb-2">
               <div className="input-group-prepend">
                 <span className="input-group-text">E-MAIL</span>
               </div>
               <input type="text" value={email} onChange={e => handleChangeEmail(e.target.value)} className="column_filter form-control-sm" />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-4">
              <div className="input-group input-group-sm mb-2">
               <div className="input-group-prepend">
                 <span className="input-group-text">Daxili</span>
               </div>
               <input type="text" value={internamlNumber} onChange={e => handleChange(e.target.value)} className="column_filter form-control-sm" />
              </div>
            </div>
            <div className="col-4">
              <div className="input-group input-group-sm mb-2">
               <div className="input-group-prepend">
                 <span className="input-group-text">Mob(iş)</span>
               </div>
               <input type="text" value={cellularPhone} onChange={e => handleChangeCellularPhone(e.target.value)} className="column_filter form-control-sm" />
              </div>
            </div>
            <div className="col-4">
              <div className="input-group input-group-sm mb-2">
               <div className="input-group-prepend">
                 <span className="input-group-text">Mob(ş)</span>
               </div>
               <input type="text" value={homePhone} onChange={e => handleChangeHomePhone(e.target.value)} className="column_filter form-control-sm" />
              </div>
            </div>
           </div>
        </div>
        <div className="mt-4" style={{
          width: '95vw'
        }}>
          <DataTable
              columns={columns}
              data={filteredData}
              pagination={false}
              paginationComponentOptions={paginationComponentOptions}
              fixedHeader={true}
              fixedHeaderScrollHeight={'60vh'}
              customStyles={customStyles}
              dense
          />
        </div>
      </div>
    </>
  )
}

export default App
