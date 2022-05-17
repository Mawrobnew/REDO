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
import M_BeneficiaryAttendance from "./M_BeneficiaryAttendance";


function T_Attendance(){
    const [userList, setUserList] = useState([]);
    const [isOpen, setIsOpen] = useState(false)

    const btnModAttendance = (cell, row, rowIndex, formatExtraData) => {
        return (
            <div>
                <M_BeneficiaryAttendance open={isOpen} onClose={setIsOpen}></M_BeneficiaryAttendance>
            </div>
        );
    };

    const columns = [
        {dataField:'Folio', text:'Folio', sort:true, filterFactory:textFilter(), key:1},
        {dataField:'Nombre', text:'Nombre', sort:true, key:2},
        {dataField:'Frecuencia', text:'Frecuencia', sort:true, key:3},
        {dataField:'Dia', text:'Dia', sort:true, key:4},
        {dataField:'Dia', text:'Asistencia', sort:true, key:5},
        {dataField:'Dia', text:'Justificación', sort:true, key:6},
        {dataField:'btn2', text:'Asistencia', formatter: btnModAttendance, key:7}
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
            const [result] = await Request('GET', '/attendanceJustify', modalInfo)
            if (result.length>0) setUserList(result)
        }
        asyncFetch()
    }, [])

    const { SearchBar, ClearSearchButton } = Search;
    const { ExportCSVButton } = CSVExport;

    return(
        <ToolkitProvider
            id='T5'
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
                            <p className='title'>Asistencia de beneficiarios</p>
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
                        </div>
                    </div>
                )
            }
        </ToolkitProvider>
    )

}

export default T_Attendance;