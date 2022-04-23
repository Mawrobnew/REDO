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
import { Button } from "react-bootstrap";
import Modal from '../component/Modal';
import '../css/modal.css';


function DataList(){
    const [userList, setUserList] = useState([]);
    const [isOpen, setIsOpen] = useState(false)


    const selectOptions = {
        0: 'gmail',
        1: 'hotmail',
        2: 'outlook',
        4: 'Shanna@melissa.tv'
    };
    
    const formatWithIcon = (cell,row) => {
        return  <div>

                </div>
    }
    const linkFollow = (cell, row, rowIndex, formatExtraData) => {
        return (
            <div>
                <Button
                    onClick={() => {
                        setIsOpen(true)
                        console.log("Openning modal")
                    }}
                >
                    Follow
                </Button>
                <Modal open={isOpen} onClose={setIsOpen}></Modal>
            </div>
        );
    };
    const columns = [
        {dataField:'Id', text:'Id', sort:true, filterFactory:textFilter()},
        {dataField:'Nombre', text:'Nombre', sort:true},
        {dataField:'Correo', text:'Correo', sort:true},
        {dataField:'Numero', text:'Telefono', sort:true},
        {dataField:'Rol', text:'Rol', sort:true},
        {dataField:'Sucursal', text:'Sucursal'},
        {dataField:'btn2', text:'Modificar', formatter: linkFollow}
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
        striped={true}
        bordered={ false }
        condensed={true}
        hover={true}
        headerClasses='pruebaHead'
        bodyClasses='pruebaBody'
        wrapperClasses='pruebaWrapper'
        >
        </BootstrapTable>
    )
    
}

export default DataList;