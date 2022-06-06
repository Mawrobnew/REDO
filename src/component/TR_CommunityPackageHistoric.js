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
import TR_AttendanceHistoric from '../component/TR_AttendanceHistoric';

function TR_CommunityPackageHistoric(){
    const [userList, setUserList] = useState([]);
    const [isOpen, setIsOpen] = useState(false)


    const selectOptions = {
        0: 'gmail',
        1: 'hotmail',
        2: 'outlook',
        4: 'Shanna@melissa.tv'
    };

    const btnUploadDo = (cell, row, rowIndex, formatExtraData) => {
        return (
            <div>
                <a href={'http://localhost:9000/3'}>Descargar</a>
                {/*Cambiar al endopoint que descarga las listas, solo ocupa el Id como parametro*/}
            </div>
        );
    };

    const columns = [
        {dataField:'FechaInicio', text:'Fecha inicial', sort:true, filterFactory:textFilter(), key:1},
        {dataField:'FechaFinal', text:'Fecha final', sort:true, key:2},
        {dataField:'Comunidad', text:'Comunidad', sort:true, key:3},
        {dataField:'PaquetesTotales', text:'Paquetes totales', sort:true, key:4},
        {dataField:'AsistenciasTotales', text:'Asistencias totales', sort:true, key:5},
        {dataField:'btn1', text:'Documentos', formatter: btnUploadDo, key:6}
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
            const [result, code] = await Request('GET', '/inCommunityAttendance')
            if (result.length>0) setUserList(result)
        }
        asyncFetch()
    }, [])

    const { SearchBar, ClearSearchButton } = Search;
    const { ExportCSVButton } = CSVExport;

    return(
        <ToolkitProvider
            id='T10'
            bootstrap4
            keyField='Id'
            columns={columns}
            data={userList}
            search
        >
            {
                props => (
                    <div id='cont_tabla'>
                        <p className='title'>Histórico de asistencia en comunidad</p>
                        <hr></hr>
                        <SearchBar { ...props.searchProps } placeholder="Buscar"/>
                        <ClearSearchButton { ...props.searchProps }></ClearSearchButton>
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
                        <TR_AttendanceHistoric/>
                    </div>
                )
            }
        </ToolkitProvider>
    )

}

export default TR_CommunityPackageHistoric;