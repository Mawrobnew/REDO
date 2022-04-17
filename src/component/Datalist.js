import React, {useState, useEffect} from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import 'bootstrap/dist/css/bootstrap.min.css';
//import 'react-bootstrap-table-next/dist/react-bootstrap-table2.css';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import filterFactory, { textFilter, selectFilter } from 'react-bootstrap-table2-filter';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//import { faUserEdit } from '@fortawesome/free-solid-svg-icons'

function DataList(){

    const [userList, setUserList] = useState([]);

    const selectOptions = {
        0: 'gmail',
        1: 'hotmail',
        2: 'outlook',
        4: 'Shanna@melissa.tv'
    };
    
    const formatWithIcon = (cell,row) => {
        return(
            <button>Hola</button>
            //<FontAwesomeIcon icon={faUserEdit} size='2x'/>
        )
    }

    const columns = [
        {dataField:'id', text:'Id', sort:true, filter: textFilter(),},
        {dataField:'name', text:'Nombre', sort:true, filter: textFilter()},
        {dataField:'email', text:'Correo', sort:true, filter: textFilter()},
        {dataField:'phone', text:'Telefono', sort:true, filter: textFilter()},
        {dataField:'company.bs', text:'Rol', sort:true, filter: textFilter()},
        {dataField:'address.street', text:'Sucursal', sort:true, filter: textFilter()},
        {dataField:'btn2', text:'Modificar', formatter: formatWithIcon},
        {dataField:'btn', text:'Borrar', formatter: formatWithIcon}
    ]
    
    const pagination = paginationFactory({
        page: 1,
        sizePerPage: 10,
        lastPageText: '>>',
        firstPageText: '<<',
        nextPageText: '>',
        prePageText: '<',
        showTotal: true,
        alwaysShowAllBtns: true,
        onPageChange: function(page, sizePerPage){
            console.log('page', page);
            console.log('sizePerPage', sizePerPage)
        },
        onSizePerPageChange: function(page, sizePerPage){
            console.log('page', page);
            console.log('sizePerPage', sizePerPage)
        }
    });


    useEffect(()=>{

        fetch('https://jsonplaceholder.typicode.com/users')
        .then(Response => Response.json())
        .then(result => setUserList(result))
        .catch(error => console.log(error));

    }, [])

    const selectRow = {
        mode:"checkbox"
    };

    return(

        <BootstrapTable 
        id='prueba2'
        bootstrap4 
        keyField='id' 
        columns={columns} 
        data={userList}
        pagination ={pagination}
        filter={filterFactory()}
        data-show-custom-view-button={true}
        //striped={true}
        bordered={ false }
        condensed={true}
        hover={true}
        headerClasses='pruebaHead'
        bodyClasses='pruebaBody'
        wrapperClasses='pruebaWrapper'
        >
            <thead></thead>
        </BootstrapTable>
    )
    
}

export default DataList;