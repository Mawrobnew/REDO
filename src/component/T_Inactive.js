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
import M_ChangeStatusInactive from './M_ChangeStatusInactive'

function T_Inactive(){
    const [userList, setUserList] = useState([]);
    const [isOpen, setIsOpen] = useState(false)

    const btnModBeneficiary = (cell, row, rowIndex, formatExtraData) => {
        return (
            <div>
                <M_ChangeStatusInactive open={isOpen} onClose={setIsOpen}></M_ChangeStatusInactive>
            </div>
        );
    };

    const columns = [
        {dataField:'Folio', text:'Folio', sort:true, filterFactory:textFilter(), key:1},
        {dataField:'Nombre', text:'Nombre', sort:true, key:2},
        {dataField:'FechaVencimiento', text:'F vencimiento', sort:true, key:4},
        {dataField:'Beca', text:'# de faltas', sort:true, key:5},
        {dataField:'btn2', text:'Activar', formatter: btnModBeneficiary, key:8}
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

    const selectRow = {
        mode:"checkbox"
    };
    const { SearchBar, ClearSearchButton } = Search;
    const { ExportCSVButton } = CSVExport;

    return(
        <ToolkitProvider
            id='T2'
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
                            <p className='title'>Beneficiarios ináctivos</p>
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
export default T_Inactive;