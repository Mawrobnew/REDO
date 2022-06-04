import React, {useState, useEffect} from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Request} from "../utils/WebRequestMiddleware";
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import '../css/table.css';
import ToolkitProvider, { Search, CSVExport }  from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';

function TR_AttendanceHistoric(){
    const [userList, setUserList] = useState([]);
    const [isOpen, setIsOpen] = useState(false)


    const selectOptions = {
        0: 'gmail',
        1: 'hotmail',
        2: 'outlook',
        4: 'Shanna@melissa.tv'
    };

    const btnAttendanceList = (cell, row, rowIndex, formatExtraData) => {
        return (
            <div>
                <a href={'http://localhost:9000/3'}>Descargar</a>
                /*Cambiar al endopoint que descarga del reporte*/
            </div>
        );
    };
    const btnJustification = (cell, row, rowIndex, formatExtraData) => {
        return (
            <div>
                <a href={'http://localhost:9000/3'}>Descargar</a>
                /*Cambiar al endopoint que descarga del reporte*/
            </div>
        );
    };
    const btnAbsence = (cell, row, rowIndex, formatExtraData) => {
        return (
            <div>
                <a href={'http://localhost:9000/3'}>Descargar</a>
                /*Cambiar al endopoint que descarga del reporte*/
            </div>
        );
    };

    const columns = [
        {dataField:'', text:'Fecha inicial', sort:true, filterFactory:textFilter(), key:1},
        {dataField:'', text:'Número de asistencias', sort:true, key:2},
        {dataField:'', text:'Número de justificaciones', sort:true, key:3},
        {dataField:'', text:'Número de faltas', sort:true, key:4},
        {dataField:'btn1', text:'Asitencias', formatter: btnAttendanceList(), key:5},
        {dataField:'btn2', text:'Justificaciones', formatter: btnJustification(), key:6},
        {dataField:'btn3', text:'Faltas', formatter: btnAbsence(), key:7},
        /*Falta la columna del id oculto*/
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
            const [result, code] = await Request('GET', '/beneficiaries')
            if (result.length>0) setUserList(result)
        }
        asyncFetch()
    }, [])

    const { SearchBar, ClearSearchButton } = Search;
    const { ExportCSVButton } = CSVExport;
    return(
        <ToolkitProvider
            id='T11'
            bootstrap4
            keyField='Id'
            columns={columns}
            data={userList}
            search
        >
            {
                props => (
                    <div id='cont_tabla'>
                        <p className='title'>Histórico de asistencia</p>
                        <hr></hr>
                        <SearchBar { ...props.searchProps } />
                        <ClearSearchButton { ...props.searchProps }/>
                        <ExportCSVButton { ...props.csvProps }>Descargar</ExportCSVButton>
                        <BootstrapTable
                            { ...props.baseProps }
                            pagination={pagination}
                            filter={filterFactory()}
                            striped={true}
                            bordered={false}
                            condensed={true}
                            hover={true}
                            headerClasses='TableHead'
                            bodyClasses='TableBody'
                            wrapperClasses='pruebaWrapper'
                        >
                        </BootstrapTable>
                    </div>
                )
            }
        </ToolkitProvider>
    )

}

export default TR_AttendanceHistoric;