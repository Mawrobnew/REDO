import React, {useState, useEffect} from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Request} from "../utils/WebRequestMiddleware";
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import M_ModUser from "./M_ModUser";
import M_DeleteUser from "./M_DeleteUser";
import M_InsertUser from "./M_InsertUser";
import M_Success from "./M_Success";
import M_Fail from "./M_Fail";
import '../css/table.css';
import ToolkitProvider, { Search, CSVExport }  from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';

function T_User(){
    const [userList, setUserList] = useState([]);
    const [isOpen, setIsOpen] = useState(false)

    const btnModUSer = (cell, row, rowIndex, formatExtraData) => {
        return (
            <div>
                <M_ModUser open={isOpen} onClose={setIsOpen}></M_ModUser>
            </div>
        );
    };
    const btnDeleteUSer = (cell, row, rowIndex, formatExtraData) => {
        return (
            <div>
                <M_DeleteUser open={isOpen} onClose={setIsOpen}></M_DeleteUser>
            </div>
        );
    };

    const columns = [
        {dataField:'Id', text:'Id', sort:true, key:1},
        {dataField:'Nombre', text:'Nombre', sort:true, key:2},
        {dataField:'Correo', text:'Correo', sort:true, key:3},
        {dataField:'Numero', text:'Telefono', sort:true, key:4},
        {dataField:'Rol', text:'Rol', sort:true, key:5},
        {dataField:'Sucursal', text:'Sucursal',sort:true, key:6},
        {dataField:'btn', text:'Modificar', formatter: btnModUSer, key:7},
        {dataField:'btn2', text:'Eliminar', formatter: btnDeleteUSer, key:8}
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
            const result = await Request('GET', '/users')
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
                            <p className='title'>Usuarios</p>
                            <hr></hr>
                            <SearchBar { ...props.searchProps } />
                            <ClearSearchButton { ...props.searchProps } Classname='btnLimpiar'></ClearSearchButton>
                            <ExportCSVButton { ...props.csvProps }>Descargar</ExportCSVButton>
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
                            <M_InsertUser/>
                            <M_Success/>
                            <M_Fail/>
                        </div>
                    </div>
                )
            }

        </ToolkitProvider>
    )

}

export default T_User;