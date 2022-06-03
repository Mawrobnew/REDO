import React, {useState, useEffect} from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Request} from "../utils/WebRequestMiddleware";
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import M_ModBeneficiary from './M_ModBeneficiary'
import '../css/table.css';
import T_BeneficiaryDocuments from "./T_BeneficiaryDocuments";
import M_UpdateBeneficiary from './M_UpdateBeneficiary'
import ToolkitProvider, { Search, CSVExport }  from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';


function T_GlobalBeneficiary(){
    const [userList, setUserList] = useState([]);
    const [isOpen, setIsOpen] = useState(false)

    const btnModBeneficiary = (cell, row, rowIndex, formatExtraData) => {
        return (
            <div>
                <M_ModBeneficiary open={isOpen} onClose={setIsOpen}></M_ModBeneficiary>
            </div>
        );
    };

    const columns = [
        {dataField:'Folio', text:'Folio', sort:true, filterFactory:textFilter(), key:1},
        {dataField:'Nombre', text:'Nombre', sort:true, key:2},
        {dataField:'FechaRegistro', text:'F. registro', sort:true, key:3},
        {dataField:'FechaVencimiento', text:'F. vencimiento', sort:true, key:4},
        {dataField:'Beca', text:'Beca', sort:true, key:5},
        {dataField:'Frecuencia', text:'Frecuencia', sort:true, key:6},
        {dataField:'Dia', text:'Día', sort:true, key:7},
        {dataField:'btn2', text:'Modificar', formatter: btnModBeneficiary, key:8}
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
            const [result, code] = await Request('GET', '/Beneficiaries')
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
                            <p className='title'>Beneficiarios</p>
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
                            <M_UpdateBeneficiary/>
                        </div>
                        <T_BeneficiaryDocuments/>
                    </div>
                )
            }
        </ToolkitProvider>
    )

}

export default T_GlobalBeneficiary;