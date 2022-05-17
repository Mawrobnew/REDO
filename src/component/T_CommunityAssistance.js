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
    const [userList, setUserList] = useState([]);
    const [isOpen, setIsOpen] = useState(false)

    const btnDocsAttendance = (cell, row, rowIndex, formatExtraData) => {
        return (
            <div>
                <M_UploadDocsCommunityAttendance open={isOpen} onClose={setIsOpen}></M_UploadDocsCommunityAttendance>
            </div>
        );
    };

    const columns = [
        {dataField:'Folio', text:'Fecha Inicial', sort:true, filterFactory:textFilter(), key:1},
        {dataField:'Nombre', text:'Fecha Final', sort:true, key:2},
        {dataField:'Frecuencia', text:'Comunidad', sort:true, key:6},
        {dataField:'Dia', text:'Paquetes Totales', sort:true, key:7},
        {dataField:'Status', text:'Asistencias Totales', sort:true, key:8},
        {text:'Listas de asistencia', formatter: btnDocsAttendance, key: 9}

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

    const modalInfo = {
        id: 1
    }

    useEffect(() => {
        const asyncFetch = async () => {
            const result = await Request('POST', '/beneficiaries', modalInfo)
            if (result.length>0) setUserList(result)
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
            data={userList}
            search
            exportCSV
        >
            {
                props => (
                    <div id='container'>
                        <div id='cont_tabla'>
                            <p className='title'>Asistencia de comunidades</p>
                            <hr></hr>
                            <SearchBar { ...props.searchProps } />
                            <ClearSearchButton { ...props.searchProps }/>
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
                            <M_CreateCommunity/>
                            <M_CreateCommittee/>
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