import React, {useState, useEffect} from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import 'bootstrap/dist/css/bootstrap.min.css';
import {HOST, DownloadFileRequest, Request} from "../utils/WebRequestMiddleware";
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import '../css/table.css';
import ToolkitProvider, { Search, CSVExport }  from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import {faDownload} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";



function TR_AttendanceHistoric(){
    const [userList, setUserList] = useState([]);

    const downloadAttendanceFile = (date) => {
        console.log("Download attendance report ", date)
        DownloadFileRequest('GET', '/attendanceReport/' + date)
    }

    const downloadJustificationFile = (date) => {
        console.log("Download justification report ", date)
        DownloadFileRequest('GET', '/justificationReport/' + date)
    }

    const downloadAbsenceFile = (date) => {
        console.log("Download absence report ", date)
        DownloadFileRequest('GET', '/absenceReport/' + date)
    }

    const btnAttendanceList = (cell, row, rowIndex, formatExtraData) => {
        // console.log(row. === 1)
        const DownloadDiv = <button className={'btnDownloadDocs'} onClick={() => {
            downloadAttendanceFile(row.FechaInicial)
        }}><FontAwesomeIcon icon={faDownload}/></button>
        const RenderedButton = (row.NumAsistencias !== 0) ? DownloadDiv : ''
        return (
            <div>
                {
                    RenderedButton
                }
            </div>
        );
    };

    const btnJustification  = (cell, row, rowIndex, formatExtraData) => {
       // console.log(row.Archivo === 1)
        const DownloadDiv = <button className={'btnDownloadDocs'} onClick={() => {
            downloadJustificationFile(row.FechaInicial)
        }}><FontAwesomeIcon icon={faDownload}/></button>
        const RenderedButton = (row.NumJustificaciones !== 0) ? DownloadDiv : ''
        return (
            <div>
                {
                    RenderedButton
                }
            </div>
        );
    };

    const btnAbsence = (cell, row, rowIndex, formatExtraData) => {
        // console.log(row.Archivo === 1)
        const DownloadDiv = <button className={'btnDownloadDocs'} onClick={() => {
            downloadAbsenceFile(row.FechaInicial)
        }}><FontAwesomeIcon icon={faDownload}/></button>
        const RenderedButton = (row.NumFaltas !== 0) ? DownloadDiv : ''
        return (
            <div>
                {
                    RenderedButton
                }
            </div>
        );
    };

    const columns = [
        {dataField:'FechaInicial', text:'Fecha inicial', sort:true, key:1},
        {dataField:'NumAsistencias', text:'Número de asistencias', sort:true, key:2},
        {dataField:'btn1', text:'Asistencias', formatter: btnAttendanceList, key:5},
        {dataField:'NumJustificaciones', text:'Número de justificaciones', sort:true, key:3},
        {dataField:'btn2', text:'Justificaciones', formatter: btnJustification, key:6},
        {dataField:'NumFaltas', text:'Número de faltas', sort:true, key:4},
        {dataField:'btn3', text:'Faltas', formatter: btnAbsence, key:7}
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
            const [result, code] = await Request('GET', '/attendanceRecord')
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
            keyField='Id2'
            columns={columns}
            data={userList}
            search
        >
            {
                props => (
                    <div id='cont_tabla'>
                        <p className='titleT'>Histórico de asistencia</p>
                        <hr></hr>
                        <SearchBar { ...props.searchProps } placeholder="Buscar" className={'searchBarTable'}/>

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
                        <ExportCSVButton { ...props.csvProps} className={'btnDownload'}>Descargar</ExportCSVButton>
                    </div>
                )
            }
        </ToolkitProvider>
    )

}

export default TR_AttendanceHistoric;