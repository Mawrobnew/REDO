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
import T_CommunityHistoric from "./T_CommunityHistoric";
import M_CreateCommunity from "./M_CreateCommunity";
import M_CreateCommittee from "./M_CreateCommittee";
import M_UploadDocsCommunityAttendance from "./M_UploadDocsCommunityAttendance";
import M_CreatePetition from "./M_CreatePetition";


function T_CommunityAssistance(){
    const [communityAssistanceList, setCommunityAssitanceList] = useState([]);
    const [isOpen, setIsOpen] = useState(false)

    const btnDocsAttendance = (cell, row, rowIndex, formatExtraData) => {
        return (
            <div>
                <M_UploadDocsCommunityAttendance idReport={row.Id}/>
            </div>
        );
    };

    const columns = [
        {dataField: 'FechaInicio', text: 'Fecha inicial', sort: true, filterFactory: textFilter(), key: 1},
        {dataField: 'FechaFinal', text: 'Fecha final', sort: true, key: 2},
        {dataField: 'Comunidad', text: 'Comunidad', sort: true, key: 6},
        {dataField: 'PaquetesTotales', text: 'Paquetes totales', sort: true, key: 7},
        {dataField: 'AsistenciasTotales', text: 'Asistencias totales', sort: true, key: 8},
        {text: 'Listas de asistencia', formatter: btnDocsAttendance, key: 9}
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
            const [result, code] = await Request('GET', '/actCommunityAttendance')
            console.log(result, code)
            if (result.length > 0) setCommunityAssitanceList(result)
        }
        asyncFetch()
    }, [])

    const { SearchBar, ClearSearchButton } = Search;
    const { ExportCSVButton } = CSVExport;

    return(
        <ToolkitProvider
            id='T6'
            bootstrap4
            keyField='Id'
            columns={columns}
            data={communityAssistanceList}
            search
            exportCSV
        >
            {
                props => (
                    <div id='container'>
                        <div id='cont_tabla'>
                            <p className='titleT'>Asistencia de comunidades</p>
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

                            <M_CreatePetition/>

                        </div>
                        <T_CommunityHistoric/>
                    </div>
                )
            }
        </ToolkitProvider>
    )
}

export default T_CommunityAssistance;