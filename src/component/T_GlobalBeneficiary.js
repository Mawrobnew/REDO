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

    const columns = [
        {dataField:'Folio', text:'Folio', sort:true, filterFactory:textFilter(), key:1},
        {dataField:'Nombre', text:'Nombre', sort:true, key:2},
        {dataField:'Colonia', text:'Colonia', sort:true, key:3},
        {dataField:'Dia', text:'Día', sort:true, key:8},
        {dataField:'FechaRegistro', text:'F. registro', sort:true, key:4},
        {dataField:'FechaVencimiento', text:'F. vencimiento', sort:true, key:5},
        {dataField:'IdStatus', text:'Estado', sort:true, key:9, hidden:true},
        {dataField:'Beca', text:'Beca', sort:true, key:6},
        {dataField:'Frecuencia', text:'Frecuencia', sort:true, key:7},
        {dataField:'Telefono', text:'Teléfono', sort:true, key:10},
        {dataField:'IdSucursal', text:'Sucursal', sort:true, key:11, hidden:true}
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
            const [result, code] = await Request('GET', '/actBeneficiaries')
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
                            <p className='titleT'>Beneficiarios</p>
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