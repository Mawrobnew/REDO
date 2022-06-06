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
import M_AbsenceReason from './M_AbsenceReason';

function T_AbsenceHistoric(){
    const [userList, setUserList] = useState([]);
    const [isOpen, setIsOpen] = useState(false)

    const btnAbsenceReason = (cell, row, rowIndex, formatExtraData) => {
        return (
            <div>
                <M_AbsenceReason open={isOpen} onClose={setIsOpen}></M_AbsenceReason>
            </div>
        );
    };


    const columns = [
        {dataField:'Folio', text:'Folio', sort:true, filterFactory:textFilter(), key:1},
        {dataField:'Nombre', text:'Nombre', sort:true, key:2},
        {dataField:'Telefono', text:'Teléfono', sort:true, key:3},
        {dataField:'Fecha', text:'Fecha', sort:true, key:4},
        {dataField:'CanFaltas', text:'Núm. de falta', sort:true, key:5},
        {dataField:'Razon', text:'Razón', sort:true, key:6},
        {text: 'Motivo', formatter: btnAbsenceReason, key: 7}
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
            const [result, code] = await Request('GET', '/recordAbsences')
            if (result.length>0) setUserList(result)
        }
        asyncFetch()
    }, [])

    const { SearchBar, ClearSearchButton } = Search;
    const { ExportCSVButton } = CSVExport;

    return(
        <ToolkitProvider
            id='T7'
            bootstrap4
            keyField='Id'
            columns={columns}
            data={userList}
            search
        >
            {
                props => (
                    <div id='cont_tabla'>
                        <p className='titleT'>Historico de faltas</p>
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

export default T_AbsenceHistoric;