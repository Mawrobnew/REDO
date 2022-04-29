import React, {useState, useEffect} from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Request} from "../utils/WebRequestMiddleware";
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import M_ModUser from "./M_ModUser";
import M_InsertUser from "./M_InsertUser";
import M_ModBeneficiary from './M_ModBeneficiary'
import '../css/table.css';
import T_BeneficiaryDocuments from "./T_BeneficiaryDocuments";
import M_UpdateBeneficiary from './M_UpdateBeneficiary'

function T_GlobalBeneficiary(){
    const [userList, setUserList] = useState([]);
    const [isOpen, setIsOpen] = useState(false)


    const selectOptions = {
        0: 'gmail',
        1: 'hotmail',
        2: 'outlook',
        4: 'Shanna@melissa.tv'
    };

    const btnModBeneficiary = (cell, row, rowIndex, formatExtraData) => {
        return (
            <div>
                <M_ModBeneficiary open={isOpen} onClose={setIsOpen}></M_ModBeneficiary>
            </div>
        );
    };

    const columns = [
        {dataField:'Id', text:'Folio', sort:true, filterFactory:textFilter()},
        {dataField:'Nombre', text:'Nombre', sort:true},
        {dataField:'Correo', text:'F registro', sort:true},
        {dataField:'Numero', text:'F vencimiento', sort:true},
        {dataField:'Rol', text:'Beca', sort:true},
        {dataField:'Sucursal', text:'Frecuencia', sort:true},
        {dataField:'Sucursal', text:'Dia', sort:true},
        {dataField:'btn2', text:'Modificar', formatter: btnModBeneficiary}
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
        <div id='container'>
            <div id='cont_tabla'>
                <p className='title'>Beneficiarios</p>
                <hr></hr>
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
                    headerClasses='TableHead'
                    bodyClasses='TableBody'
                    wrapperClasses='pruebaWrapper'
                >
                </BootstrapTable>
                <M_UpdateBeneficiary/>
            </div>
            <T_BeneficiaryDocuments/>
        </div>
    )

}

export default T_GlobalBeneficiary;