import React, {useState, useEffect} from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Request} from "../utils/WebRequestMiddleware";
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import filterFactory from 'react-bootstrap-table2-filter';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import M_ModUser from "./M_ModUser";
import M_DeleteUser from "./M_DeleteUser";
import M_InsertUser from "./M_InsertUser";
import '../css/table.css';
import ToolkitProvider, { Search, CSVExport }  from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import M_ModUserPass from "./M_ModUserPass";

function T_User(){
    const [userList, setUserList] = useState([]);
    const [isOpen, setIsOpen] = useState(false)
    const deleteUser = (id) =>{
        console.log(userList)
        const filteredList = userList.filter((user)=>user.Id!==id);
        setUserList(filteredList)
    }

    const btnModUSer = (cell, row, rowIndex, formatExtraData) => {
        const {Nombre, Correo, Numero, Id, IdRol, IdSucursal} = row
        const info = {name: Nombre, mail: Correo, phone: Numero, id: Id, rol: IdRol, branch: IdSucursal}
        return (
            <div>
                <M_ModUser open={isOpen} onClose={setIsOpen} userinfo={info}/>
            </div>
        );
    };
    const btnDeleteUSer = (cell, row, rowIndex, formatExtraData) => {
        const info = {name: row.Nombre, id: row.Id}
        return (
            <div>
                <M_DeleteUser open={isOpen} onClose={setIsOpen} userInfo={info} deleteAction={deleteUser}/>
            </div>
        );
    };
    const btnModUserPass = (cell, row, rowIndex, formatExtraData) => {
        const info = {id: row.Id}
        return (
            <div>
                <M_ModUserPass id={info}/>
            </div>
        );
    };

    const columns = [
        {dataField: 'Id', text: 'Id', sort: true, key: 1, hidden: true},
        {dataField: 'Nombre', text: 'Nombre', sort: true, key: 2},
        {dataField: 'Correo', text: 'Correo', sort: true, key: 3},
        {dataField: 'Numero', text: 'Tel??fono', sort: true, key: 4},
        {dataField: 'Rol', text: 'Rol', sort: true, key: 5},
        {dataField: 'Sucursal', text: 'Sucursal', sort: true, key: 6},
        {dataField: 'btn', text: 'Modificar', formatter: btnModUSer, key: 7},
        {dataField: 'btn3', text: 'Contrase??a', formatter: btnModUserPass, key: 9},
        {dataField: 'btn2', text: 'Eliminar', formatter: btnDeleteUSer, key: 8},
        {dataField: 'IdRol', text: 'Rol', sort: true, key: 10, hidden: true},
        {dataField: 'IdSucursal', text: 'Sucursal', sort: true, key: 11, hidden: true},
    ]

    const customTotal = (from, to, size) => (
        <span className="react-bootstrap-table-pagination-total">
            Registros { from } hasta { to } de { size } totales
        </span>
    );
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
        },
        paginationTotalRenderer: customTotal
    });

    useEffect(() => {
        const asyncFetch = async () => {
            const [result, code] = await Request('GET', '/users')
            if (result.length) setUserList(result)
        }
        asyncFetch()
    }, [])

    const { SearchBar, ClearSearchButton } = Search;
    const { ExportCSVButton } = CSVExport;

    return(
        <ToolkitProvider
            id='T1'
            keyField='Id'
            bootstrap4
            columns={columns}
            data={userList}
            search
            exportCSV
        >
            {
                props => (
                    <div id='container'>
                        <div id='cont_tabla'>
                            <p className='titleT'>Usuarios</p>
                            <hr></hr>
                            <SearchBar { ...props.searchProps } placeholder="Buscar" className={'searchBarTable'}/>
                            <BootstrapTable
                                { ...props.baseProps }
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
                            <ExportCSVButton { ...props.csvProps} className={'btnDownload'}>Descargar</ExportCSVButton>
                        </div>
                        <M_InsertUser/>
                    </div>
                )
            }

        </ToolkitProvider>
    )

}

export default T_User;