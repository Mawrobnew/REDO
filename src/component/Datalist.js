import React, {useState, useEffect} from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Request} from "../utils/WebRequestMiddleware";
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
        {dataField:'Id', text:'Id', sort:true, filter: textFilter(),},
        {dataField:'Nombre', text:'Nombre', sort:true, filter: textFilter()},
        {dataField:'Correo', text:'Correo', sort:true, filter: textFilter()},
        {dataField:'Numero', text:'Telefono', sort:true, filter: textFilter()},
        {dataField:'Rol', text:'Rol', sort:true, filter: textFilter()},
        {dataField:'Sucursal', text:'Sucursal', sort:true, filter: textFilter()},
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


    useEffect(() => {
        const asyncFetch = async () => {
            const result = await Request('GET', '/user')
            const {done, payload} = result
            if (done) setUserList(payload)
        }
        asyncFetch()
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
            <thead/>
        </BootstrapTable>
    )
    
}

export default DataList;