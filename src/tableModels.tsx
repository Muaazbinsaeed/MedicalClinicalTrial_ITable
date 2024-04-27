import {
  ColumnDef,
  FilterFn,
  SortingFn,
  sortingFns,
} from '@tanstack/react-table'
import React from 'react'
import { Person, ClinicalTrial} from './makeData'
import {
  rankItem,
  compareItems,
  RankingInfo,
} from '@tanstack/match-sorter-utils'
import IndeterminateCheckbox from './components/InderterminateCheckbox'

// export const fuzzyFilter: FilterFn<Person> = (row, columnId, value, addMeta) => {
//   // Rank the item
//   const itemRank = rankItem(row.getValue(columnId), value)

//   // Store the ranking info
//   addMeta(itemRank)

//   // Return if the item should be filtered in/out
//   return itemRank.passed
// }


export const fuzzyFilter: FilterFn<ClinicalTrial> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value)

  // Store the ranking info
  addMeta(itemRank)

  // Return if the item should be filtered in/out
  return itemRank.passed
}

// export const fuzzySort: SortingFn<Person> = (rowA, rowB, columnId) => {
//   let dir = 0

//   // Only sort by rank if the column has ranking information
//   if (rowA.columnFiltersMeta[columnId]) {
//     dir = compareItems(
//       rowA.columnFiltersMeta[columnId]! as RankingInfo,
//       rowB.columnFiltersMeta[columnId]! as RankingInfo
//     )
//   }

//   // Provide an alphanumeric fallback for when the item ranks are equal
//   return dir === 0 ? sortingFns.alphanumeric(rowA, rowB, columnId) : dir
// }


export const fuzzySort: SortingFn<ClinicalTrial> = (rowA, rowB, columnId) => {
  let dir = 0

  // Only sort by rank if the column has ranking information
  if (rowA.columnFiltersMeta[columnId]) {
    dir = compareItems(
      rowA.columnFiltersMeta[columnId]! as RankingInfo,
      rowB.columnFiltersMeta[columnId]! as RankingInfo
    )
  }

  // Provide an alphanumeric fallback for when the item ranks are equal
  return dir === 0 ? sortingFns.alphanumeric(rowA, rowB, columnId) : dir
}

export type TableMeta = {
  updateData: (rowIndex: number, columnId: string, value: unknown) => void
}

// // Give our default column cell renderer editing superpowers!
// export const defaultColumn: Partial<ColumnDef<Person>> = {
//   cell: ({ getValue, row: { index }, column: { id }, table }) => {
//     const initialValue = getValue()
//     // We need to keep and update the state of the cell normally
//     const [value, setValue] = React.useState(initialValue)

//     // When the input is blurred, we'll call our table meta's updateData function
//     const onBlur = () => {
//       ;(table.options.meta as TableMeta).updateData(index, id, value)
//     }

//     // If the initialValue is changed external, sync it up with our state
//     React.useEffect(() => {
//       setValue(initialValue)
//     }, [initialValue])

//     return (
//       <input
//         value={value as string}
//         onChange={e => setValue(e.target.value)}
//         onBlur={onBlur}
//       />
//     )
//   },
// }


// Give our default column cell renderer editing superpowers!
export const defaultColumn: Partial<ColumnDef<ClinicalTrial>> = {
  cell: ({ getValue, row: { index }, column: { id }, table }) => {
    const initialValue = getValue()
    // We need to keep and update the state of the cell normally
    const [value, setValue] = React.useState(initialValue)

    // When the input is blurred, we'll call our table meta's updateData function
    const onBlur = () => {
      ;(table.options.meta as TableMeta).updateData(index, id, value)
    }

    // If the initialValue is changed external, sync it up with our state
    React.useEffect(() => {
      setValue(initialValue)
    }, [initialValue])

    return (
      <input
        value={value as string}
        onChange={e => setValue(e.target.value)}
        onBlur={onBlur}
      />
    )
  },
}

// export const columns: ColumnDef<Person>[] = [
//   {
//     id: 'select',
//     header: ({ table }) => (
//       <IndeterminateCheckbox
//         checked={table.getIsAllRowsSelected()}
//         indeterminate={table.getIsSomeRowsSelected()}
//         onChange={table.getToggleAllRowsSelectedHandler()}
//       />
//     ),
//     cell: ({ row }) => (
//       <div className="px-1">
//         <IndeterminateCheckbox
//           checked={row.getIsSelected()}
//           indeterminate={row.getIsSomeSelected()}
//           onChange={row.getToggleSelectedHandler()}
//         />
//       </div>
//     ),
//   },
//   {
//     header: 'Name',
//     footer: props => props.column.id,
//     columns: [
//       {
//         accessorKey: 'firstName',
//         cell: info => info.getValue(),
//         footer: props => props.column.id,
//       },
//       {
//         accessorFn: row => row.lastName,
//         id: 'lastName',
//         cell: info => info.getValue(),
//         header: () => <span>Last Name</span>,
//         footer: props => props.column.id,
//       },
//       {
//         accessorFn: row => `${row.firstName} ${row.lastName}`,
//         id: 'fullName',
//         header: 'Full Name',
//         cell: info => info.getValue(),
//         footer: props => props.column.id,
//         filterFn: fuzzyFilter,
//         sortingFn: fuzzySort,
//       },
//     ],
//   },
//   {
//     header: 'Info',
//     footer: props => props.column.id,
//     columns: [
//       {
//         accessorKey: 'age',
//         header: () => 'Age',
//         footer: props => props.column.id,
//       },
//       {
//         header: 'More Info',
//         columns: [
//           {
//             accessorKey: 'visits',
//             header: () => <span>Visits</span>,
//             footer: props => props.column.id,
//           },
//           {
//             accessorKey: 'status',
//             header: 'Status',
//             footer: props => props.column.id,
//           },
//           {
//             accessorKey: 'progress',
//             header: 'Profile Progress',
//             footer: props => props.column.id,
//           },
//         ],
//       },
//     ],
//   },
// ]

// export const columns: ColumnDef<ClinicalTrial>[] = [
//   {
//     id: 'select',
//     header: ({ table }) => (
//       <IndeterminateCheckbox
//         checked={table.getIsAllRowsSelected()}
//         indeterminate={table.getIsSomeRowsSelected()}
//         onChange={table.getToggleAllRowsSelectedHandler()}
//       />
//     ),
//     cell: ({ row }) => (
//       <div className="px-1">
//         <IndeterminateCheckbox
//           checked={row.getIsSelected()}
//           indeterminate={row.getIsSomeSelected()}
//           onChange={row.getToggleSelectedHandler()}
//         />
//       </div>
//     ),
//   },

//   // {
//   //   header: 'Name',
//   //   footer: props => props.column.id,
//   //   columns: [
//   //     {
//   //       accessorKey: 'firstName',
//   //       cell: info => info.getValue(),
//   //       footer: props => props.column.id,
//   //     },
//   //     {
//   //       accessorFn: row => row.lastName,
//   //       id: 'lastName',
//   //       cell: info => info.getValue(),
//   //       header: () => <span>Last Name</span>,
//   //       footer: props => props.column.id,
//   //     },
//   //     {
//   //       accessorFn: row => `${row.firstName} ${row.lastName}`,
//   //       id: 'fullName',
//   //       header: 'Full Name',
//   //       cell: info => info.getValue(),
//   //       footer: props => props.column.id,
//   //       filterFn: fuzzyFilter,
//   //       sortingFn: fuzzySort,
//   //     },
//   //   ],
//   // },
//   // {
//   //   header: 'Info',
//   //   footer: props => props.column.id,
//   //   columns: [
//   //     {
//   //       accessorKey: 'age',
//   //       header: () => 'Age',
//   //       footer: props => props.column.id,
//   //     },
//   //     {
//   //       header: 'More Info',
//   //       columns: [
//   //         {
//   //           accessorKey: 'visits',
//   //           header: () => <span>Visits</span>,
//   //           footer: props => props.column.id,
//   //         },
//   //         {
//   //           accessorKey: 'status',
//   //           header: 'Status',
//   //           footer: props => props.column.id,
//   //         },
//   //         {
//   //           accessorKey: 'progress',
//   //           header: 'Profile Progress',
//   //           footer: props => props.column.id,
//   //         },
//   //       ],
//   //     },
//   //   ],
//   // },

//   {
//     id: 'nct',
//     accessorKey: 'nct',
//     header: () => <span>NCT</span>,
//     cell: info => info.getValue(),
//     footer: props => props.column.id,
//   },
//   {
//     id: 'pubmedId',
//     accessorKey: 'pubmedId',
//     header: () => <span>PubMed ID</span>,
//     cell: info => info.getValue(),
//     footer: props => props.column.id,
//   },
//   {
//     id: 'trialName',
//     accessorKey: 'trialName',
//     header: () => <span>Trial Name</span>,
//     cell: info => info.getValue(),
//     footer: props => props.column.id,
//   },
//   {
//     id: 'author',
//     accessorKey: 'author',
//     header: () => <span>Author</span>,
//     cell: info => info.getValue(),
//     footer: props => props.column.id,
//   },
//   {
//     id: 'year',
//     accessorKey: 'year',
//     header: () => <span>Year</span>,
//     cell: info => info.getValue(),
//     footer: props => props.column.id,
//   },
//   {
//     id: 'fullPubOrAbstract',
//     accessorKey: 'fullPubOrAbstract',
//     header: () => <span>Full Pub or Abstract</span>,
//     cell: info => info.getValue(),
//     footer: props => props.column.id,
//   },
//   {
//     id: 'phase',
//     accessorKey: 'phase',
//     header: () => <span>Phase</span>,
//     cell: info => info.getValue(),
//     footer: props => props.column.id,
//   },
//   {
//     id: 'originalfollowUp',
//     accessorKey: 'originalfollowUp',
//     header: () => <span>Original/Follow Up</span>,
//     cell: info => info.getValue(),
//     footer: props => props.column.id,
//   },
//   {
//     id: 'numberOfArmsIncluded',
//     accessorKey: 'numberOfArmsIncluded',
//     header: () => <span>Number of Arms Included</span>,
//     cell: info => info.getValue(),
//     footer: props => props.column.id,
//   },
//   {
//     id: 'treatmentArms',
//     accessorKey: 'treatmentArms',
//     header: () => <span>Treatment Arm(s)</span>,
//     cell: info => info.getValue(),
//     footer: props => props.column.id,
//   },
//   {
//     id: 'controlArm',
//     accessorKey: 'controlArm',
//     header: () => <span>Control Arm</span>,
//     cell: info => info.getValue(),
//     footer: props => props.column.id,
//   },
//   {
//     id: 'classOfAgentInTreatmentArm1',
//     accessorKey: 'classOfAgentInTreatmentArm1',
//     header: () => <span>Class of Agent in Treatment Arm 1</span>,
//     cell: info => info.getValue(),
//     footer: props => props.column.id,
//   },
//   {
//     id: 'treatmentArm1Regimen',
//     accessorKey: 'treatmentArm1Regimen',
//     header: () => <span>Treatment Arm 1 Regimen</span>,
//     cell: info => info.getValue(),
//     footer: props => props.column.id,
//   },
//   {
//     id: 'totalParticipantsN',
//     accessorKey: 'totalParticipantsN',
//     header: () => <span>Total Participants - N</span>,
//     cell: info => info.getValue(),
//     footer: props => props.column.id,
//   },
//   {
//     id: 'treatmentArmN',
//     accessorKey: 'treatmentArmN',
//     header: () => <span>Treatment Arm - N</span>,
//     cell: info => info.getValue(),
//     footer: props => props.column.id,
//   },
//   {
//     id: 'controlArmN',
//     accessorKey: 'controlArmN',
//     header: () => <span>Control Arm - N</span>,
//     cell: info => info.getValue(),
//     footer: props => props.column.id,
//   },
//   {
//     id: 'medianFollowupDurationMo',
//     accessorKey: 'medianFollowupDurationMo',
//     header: () => <span>Median Follow-Up Duration (mo)</span>,
//     cell: info => info.getValue(),
//     footer: props => props.column.id,
//   },
//   {
//     id: 'qualityOfLifeReported',
//     accessorKey: 'qualityOfLifeReported',
//     header: () => <span>Quality of Life reported</span>,
//     cell: info => info.getValue(),
//     footer: props => props.column.id,
//   },
//   {
//     id: 'qualityOfLifeScale',
//     accessorKey: 'qualityOfLifeScale',
//     header: () => <span>Quality of Life Scale</span>,
//     cell: info => info.getValue(),
//     footer: props => props.column.id,
//   },
//   {
//     id: 'primaryEndpoints',
//     accessorKey: 'primaryEndpoints',
//     header: () => <span>Primary Endpoint(s)</span>,
//     cell: info => info.getValue(),
//     footer: props => props.column.id,
//   },
//   {
//     id: 'secondaryEndpoints',
//     accessorKey: 'secondaryEndpoints',
//     header: () => <span>Secondary Endpoint(s)</span>,
//     cell: info => info.getValue(),
//     footer: props => props.column.id,
//   },
//   {
//     id: 'addonTreatment',
//     accessorKey: 'addonTreatment',
//     header: () => <span>Add-on Treatment</span>,
//     cell: info => info.getValue(),
//     footer: props => props.column.id,
//   },
//   {
//     id: 'treatmentClass',
//     accessorKey: 'treatmentClass',
//     header: () => <span>Treatment Class</span>,
//     cell: info => info.getValue(),
//     footer: props => props.column.id,
//   },
//   {
//     id: 'typeOfTherapy',
//     accessorKey: 'typeOfTherapy',
//     header: () => <span>Type of Therapy</span>,
//     cell: info => info.getValue(),
//     footer: props => props.column.id,
//   },
//   {
//     id: 'Median On-Treatment Duration (mo) ',
//     header: () => <span>Median On-Treatment Duration (mo) </span>,
//     footer: props => props.column.id,
//     columns: [
//       {
//         id: 'medianOntreatmentDurationMoTreatment',
//         accessorKey: 'medianOntreatmentDurationMoTreatment',
//         header: () => <span> Treatment</span>,
//         cell: info => info.getValue(),
//         footer: props => props.column.id,
//       },
//       {
//         id: 'medianOntreatmentDurationMoControl',
//         accessorKey: 'medianOntreatmentDurationMoControl',
//         header: () => <span> Control </span>,
//         cell: info => info.getValue(),
//         footer: props => props.column.id,
//       },
//     ]
//   },
//   {
//     id: 'Reporting by prognostic groups - Y/N ',
//     header: () => <span>Reporting by prognostic groups - Y/N </span>,
//     footer: props => props.column.id,
//     columns: [
//       {
//         id: 'reportingByPrognosticGroupsYnSynchronous',
//         accessorKey: 'reportingByPrognosticGroupsYnSynchronous',
//         header: () => <span> Synchronous</span>,
//         cell: info => info.getValue(),
//         footer: props => props.column.id,
//       },
//       {
//         id: 'reportingByPrognosticGroupsYnMetachronous',
//         accessorKey: 'reportingByPrognosticGroupsYnMetachronous',
//         header: () => <span> Metachronous</span>,
//         cell: info => info.getValue(),
//         footer: props => props.column.id,
//       },
//       {
//         id: 'reportingByPrognosticGroupsYnHighVolume',
//         accessorKey: 'reportingByPrognosticGroupsYnHighVolume',
//         header: () => <span> High volume</span>,
//         cell: info => info.getValue(),
//         footer: props => props.column.id,
//       },
//       {
//         id: 'reportingByPrognosticGroupsYnLowVolume',
//         accessorKey: 'reportingByPrognosticGroupsYnLowVolume',
//         header: () => <span> Low volume</span>,
//         cell: info => info.getValue(),
//         footer: props => props.column.id,
//       },
//     ]
//   },
//   {
//     id: 'Mode of metastases - N (%) ',
//     header: () => <span>Mode of metastases - N (%) </span>,
//     footer: props => props.column.id,
//     columns: [
//       {
//         id: 'modeOfMetastasesNSynchronousTreatment',
//         accessorKey: 'modeOfMetastasesNSynchronousTreatment',
//         header: () => <span> Treatment</span>,
//         cell: info => info.getValue(),
//         footer: props => props.column.id,
//       },
//       {
//         id: 'modeOfMetastasesNSynchronousControl',
//         accessorKey: 'modeOfMetastasesNSynchronousControl',
//         header: () => <span> Control</span>,
//         cell: info => info.getValue(),
//         footer: props => props.column.id,
//       },
//       {
//         id: 'modeOfMetastasesNMetachronousTreatment',
//         accessorKey: 'modeOfMetastasesNMetachronousTreatment',
//         header: () => <span> Treatment</span>,
//         cell: info => info.getValue(),
//         footer: props => props.column.id,
//       },
//       {
//         id: 'modeOfMetastasesNMetachronousControl',
//         accessorKey: 'modeOfMetastasesNMetachronousControl',
//         header: () => <span> Control</span>,
//         cell: info => info.getValue(),
//         footer: props => props.column.id,
//       },
//     ]
//   },
//   {
//     id: 'Volume of disease - N (%) ',
//     header: () => <span>Volume of disease - N (%) </span>,
//     footer: props => props.column.id,
//     columns: [
//       {
//         id: 'volumeOfDiseaseNHighTreatment',
//         accessorKey: 'volumeOfDiseaseNHighTreatment',
//         header: () => <span> Treatment</span>,
//         cell: info => info.getValue(),
//         footer: props => props.column.id,
//       },
//       {
//         id: 'volumeOfDiseaseNHighControl',
//         accessorKey: 'volumeOfDiseaseNHighControl',
//         header: () => <span> Control</span>,
//         cell: info => info.getValue(),
//         footer: props => props.column.id,
//       },
//       {
//         id: 'volumeOfDiseaseNLowTreatment',
//         accessorKey: 'volumeOfDiseaseNLowTreatment',
//         header: () => <span> Treatment</span>,
//         cell: info => info.getValue(),
//         footer: props => props.column.id,
//       },
//       {
//         id: 'volumeOfDiseaseNLowControl',
//         accessorKey: 'volumeOfDiseaseNLowControl',
//         header: () => <span> Control</span>,
//         cell: info => info.getValue(),
//         footer: props => props.column.id,
//       },
//     ]
//   },
//   {
//     id: 'Docetaxel administration - N (%) ',
//     header: () => <span>Docetaxel administration - N (%) </span>,
//     footer: props => props.column.id,
//     columns: [
//       {
//         id: 'docetaxelAdministrationNTreatment',
//         accessorKey: 'docetaxelAdministrationNTreatment',
//         header: () => <span> Treatment</span>,
//         cell: info => info.getValue(),
//         footer: props => props.column.id,
//       },
//       {
//         id: 'docetaxelAdministrationNControl',
//         accessorKey: 'docetaxelAdministrationNControl',
//         header: () => <span> Control</span>,
//         cell: info => info.getValue(),
//         footer: props => props.column.id,
//       },
//     ]
//   },
//   {
//     id: 'Median Age (years) ',
//     header: () => <span>Median Age (years) </span>,
//     footer: props => props.column.id,
//     columns: [
//       {
//         id: 'medianAgeYearsTreatment',
//         accessorKey: 'medianAgeYearsTreatment',
//         header: () => <span> Treatment</span>,
//         cell: info => info.getValue(),
//         footer: props => props.column.id,
//       },
//       {
//         id: 'medianAgeYearsControl',
//         accessorKey: 'medianAgeYearsControl',
//         header: () => <span> Control</span>,
//         cell: info => info.getValue(),
//         footer: props => props.column.id,
//       },
//     ]
//   },
//   {
//     id: 'Race - N (%) ',
//     header: () => <span>Race - N (%) </span>,
//     footer: props => props.column.id,
//     columns: [
//       {
//         id: 'raceNWhiteTreatment',
//         accessorKey: 'raceNWhiteTreatment',
//         header: () => <span> Treatment</span>,
//         cell: info => info.getValue(),
//         footer: props => props.column.id,
//       },
//       {
//         id: 'raceNWhiteControl',
//         accessorKey: 'raceNWhiteControl',
//         header: () => <span> Control</span>,
//         cell: info => info.getValue(),
//         footer: props => props.column.id,
//       },
//       {
//         id: 'raceNBlackOrAfricanAmericanTreatment',
//         accessorKey: 'raceNBlackOrAfricanAmericanTreatment',
//         header: () => <span> Treatment</span>,
//         cell: info => info.getValue(),
//         footer: props => props.column.id,
//       },
//       {
//         id: 'raceNBlackOrAfricanAmericanControl',
//         accessorKey: 'raceNBlackOrAfricanAmericanControl',
//         header: () => <span> Control</span>,
//         cell: info => info.getValue(),
//         footer: props => props.column.id,
//       },
//       {
//         id: 'raceNAsianTreatment',
//         accessorKey: 'raceNAsianTreatment',
//         header: () => <span> Treatment</span>,
//         cell: info => info.getValue(),
//         footer: props => props.column.id,
//       },
//       {
//         id: 'raceNAsianControl',
//         accessorKey: 'raceNAsianControl',
//         header: () => <span> Control</span>,
//         cell: info => info.getValue(),
//         footer: props => props.column.id,
//       },
//       {
//         id: 'raceNNatHawaiianOrPacIslanderTreatment',
//         accessorKey: 'raceNNatHawaiianOrPacIslanderTreatment',
//         header: () => <span> Treatment</span>,
//         cell: info => info.getValue(),
//         footer: props => props.column.id,
//       },
//       {
//         id: 'raceNNatHawaiianOrPacIslanderControl',
//         accessorKey: 'raceNNatHawaiianOrPacIslanderControl',
//         header: () => <span> Control</span>,
//         cell: info => info.getValue(),
//         footer: props => props.column.id,
//       },
//       {
//         id: 'raceNAmerIndianOrAlaskaNatTreatment',
//         accessorKey: 'raceNAmerIndianOrAlaskaNatTreatment',
//         header: () => <span> Treatment</span>,
//         cell: info => info.getValue(),
//         footer: props => props.column.id,
//       },
//       {
//         id: 'raceNAmerIndianOrAlaskaNatControl',
//         accessorKey: 'raceNAmerIndianOrAlaskaNatControl',
//         header: () => <span> Control</span>,
//         cell: info => info.getValue(),
//         footer: props => props.column.id,
//       },
//       {
//         id: 'raceNOtherTreatment',
//         accessorKey: 'raceNOtherTreatment',
//         header: () => <span> Treatment</span>,
//         cell: info => info.getValue(),
//         footer: props => props.column.id,
//       },
//       {
//         id: 'raceNOtherControl',
//         accessorKey: 'raceNOtherControl',
//         header: () => <span> Control</span>,
//         cell: info => info.getValue(),
//         footer: props => props.column.id,
//       },
//       {
//         id: 'raceNUnknownTreatment',
//         accessorKey: 'raceNUnknownTreatment',
//         header: () => <span> Treatment</span>,
//         cell: info => info.getValue(),
//         footer: props => props.column.id,
//       },
//       {
//         id: 'raceNUnknownControl',
//         accessorKey: 'raceNUnknownControl',
//         header: () => <span> Control</span>,
//         cell: info => info.getValue(),
//         footer: props => props.column.id,
//       },
//     ]
//   },
//   {
//     id: 'Region - N (%) ',
//     header: () => <span>Region - N (%) </span>,
//     footer: props => props.column.id,
//     columns: [
//       {
//         id: 'regionNNorthAmericaTreatment',
//         accessorKey: 'regionNNorthAmericaTreatment',
//         header: () => <span> Treatment</span>,
//         cell: info => info.getValue(),
//         footer: props => props.column.id,
//       },
//       {
//         id: 'regionNNorthAmericaControl',
//         accessorKey: 'regionNNorthAmericaControl',
//         header: () => <span> Control</span>,
//         cell: info => info.getValue(),
//         footer: props => props.column.id,
//       },
//       {
//         id: 'regionNSouthAmericaTreatment',
//         accessorKey: 'regionNSouthAmericaTreatment',
//         header: () => <span> Treatment</span>,
//         cell: info => info.getValue(),
//         footer: props => props.column.id,
//       },
//       {
//         id: 'regionNSouthAmericaControl',
//         accessorKey: 'regionNSouthAmericaControl',
//         header: () => <span> Control</span>,
//         cell: info => info.getValue(),
//         footer: props => props.column.id,
//       },
//       {
//         id: 'regionNEuropeTreatment',
//         accessorKey: 'regionNEuropeTreatment',
//         header: () => <span> Treatment</span>,
//         cell: info => info.getValue(),
//         footer: props => props.column.id,
//       },
//       {
//         id: 'regionNEuropeControl',
//         accessorKey: 'regionNEuropeControl',
//         header: () => <span> Control</span>,
//         cell: info => info.getValue(),
//         footer: props => props.column.id,
//       },
//       {
//         id: 'regionNAfricaTreatment',
//         accessorKey: 'regionNAfricaTreatment',
//         header: () => <span> Treatment</span>,
//         cell: info => info.getValue(),
//         footer: props => props.column.id,
//       },
//       {
//         id: 'regionNAfricaControl',
//         accessorKey: 'regionNAfricaControl',
//         header: () => <span> Control</span>,
//         cell: info => info.getValue(),
//         footer: props => props.column.id,
//       },
//       {
//         id: 'regionNAsiaTreatment',
//         accessorKey: 'regionNAsiaTreatment',
//         header: () => <span> Treatment</span>,
//         cell: info => info.getValue(),
//         footer: props => props.column.id,
//       },
//       {
//         id: 'regionNAsiaControl',
//         accessorKey: 'regionNAsiaControl',
//         header: () => <span> Control</span>,
//         cell: info => info.getValue(),
//         footer: props => props.column.id,
//       },
//       {
//         id: 'regionNOceaniaTreatment',
//         accessorKey: 'regionNOceaniaTreatment',
//         header: () => <span> Treatment</span>,
//         cell: info => info.getValue(),
//         footer: props => props.column.id,
//       },
//       {
//         id: 'regionNOceaniaControl',
//         accessorKey: 'regionNOceaniaControl',
//         header: () => <span> Control</span>,
//         cell: info => info.getValue(),
//         footer: props => props.column.id,
//       },
//     ]
//   },
//   {
//     id: 'PS - N (%) ',
//     header: () => <span>PS - N (%) </span>,
//     footer: props => props.column.id,
//     columns: [
//       {
//         id: 'psN0Treatment',
//         accessorKey: 'psN0Treatment',
//         header: () => <span> Treatment</span>,
//         cell: info => info.getValue(),
//         footer: props => props.column.id,
//       },
//       {
//         id: 'psN0Control',
//         accessorKey: 'psN0Control',
//         header: () => <span> Control</span>,
//         cell: info => info.getValue(),
//         footer: props => props.column.id,
//       },
//       {
//         id: 'psN12Treatment',
//         accessorKey: 'psN12Treatment',
//         header: () => <span> Treatment</span>,
//         cell: info => info.getValue(),
//         footer: props => props.column.id,
//       },
//       {
//         id: 'psN12Control',
//         accessorKey: 'psN12Control',
//         header: () => <span> Control</span>,
//         cell: info => info.getValue(),
//         footer: props => props.column.id,
//       },
//     ]
//   },
//   {
//     id: 'Gleason score - N (%) ',
//     header: () => <span>Gleason score - N (%) </span>,
//     footer: props => props.column.id,
//     columns: [
//       {
//         id: 'gleasonScoreN7Treatment',
//         accessorKey: 'gleasonScoreN7Treatment',
//         header: () => <span> Treatment</span>,
//         cell: info => info.getValue(),
//         footer: props => props.column.id,
//       },
//       {
//         id: 'gleasonScoreN7Control',
//         accessorKey: 'gleasonScoreN7Control',
//         header: () => <span> Control</span>,
//         cell: info => info.getValue(),
//         footer: props => props.column.id,
//       },
//       {
//         id: 'gleasonScoreN8Treatment',
//         accessorKey: 'gleasonScoreN8Treatment',
//         header: () => <span> Treatment</span>,
//         cell: info => info.getValue(),
//         footer: props => props.column.id,
//       },
//       {
//         id: 'gleasonScoreN8Control',
//         accessorKey: 'gleasonScoreN8Control',
//         header: () => <span> Control</span>,
//         cell: info => info.getValue(),
//         footer: props => props.column.id,
//       },
//     ]
//   },
//   {
//     id: 'Metastases - N (%) ',
//     header: () => <span>Metastases - N (%) </span>,
//     footer: props => props.column.id,
//     columns: [
//       {
//         id: 'metastasesNLiverTreatment',
//         accessorKey: 'metastasesNLiverTreatment',
//         header: () => <span> Treatment</span>,
//         cell: info => info.getValue(),
//         footer: props => props.column.id,
//       },
//       {
//         id: 'metastasesNLiverControl',
//         accessorKey: 'metastasesNLiverControl',
//         header: () => <span> Control</span>,
//         cell: info => info.getValue(),
//         footer: props => props.column.id,
//       },
//       {
//         id: 'metastasesNLungsTreatment',
//         accessorKey: 'metastasesNLungsTreatment',
//         header: () => <span> Treatment</span>,
//         cell: info => info.getValue(),
//         footer: props => props.column.id,
//       },
//       {
//         id: 'metastasesNLungsControl',
//         accessorKey: 'metastasesNLungsControl',
//         header: () => <span> Control</span>,
//         cell: info => info.getValue(),
//         footer: props => props.column.id,
//       },
//       {
//         id: 'metastasesNBoneTreatment',
//         accessorKey: 'metastasesNBoneTreatment',
//         header: () => <span> Treatment</span>,
//         cell: info => info.getValue(),
//         footer: props => props.column.id,
//       },
//       {
//         id: 'metastasesNBoneControl',
//         accessorKey: 'metastasesNBoneControl',
//         header: () => <span> Control</span>,
//         cell: info => info.getValue(),
//         footer: props => props.column.id,
//       },
//       {
//         id: 'metastasesNNodalTreatment',
//         accessorKey: 'metastasesNNodalTreatment',
//         header: () => <span> Treatment</span>,
//         cell: info => info.getValue(),
//         footer: props => props.column.id,
//       },
//       {
//         id: 'metastasesNNodalControl',
//         accessorKey: 'metastasesNNodalControl',
//         header: () => <span> Control</span>,
//         cell: info => info.getValue(),
//         footer: props => props.column.id,
//       },
//     ]
//   },
//   {
//     id: 'Previous local therapy - N (%) ',
//     header: () => <span>Previous local therapy - N (%) </span>,
//     footer: props => props.column.id,
//     columns: [
//       {
//         id: 'previousLocalTherapyNProstatectomyTreatment',
//         accessorKey: 'previousLocalTherapyNProstatectomyTreatment',
//         header: () => <span> Treatment</span>,
//         cell: info => info.getValue(),
//         footer: props => props.column.id,
//       },
//       {
//         id: 'previousLocalTherapyNProstatectomyControl',
//         accessorKey: 'previousLocalTherapyNProstatectomyControl',
//         header: () => <span> Control</span>,
//         cell: info => info.getValue(),
//         footer: props => props.column.id,
//       },
//       {
//         id: 'previousLocalTherapyNOrchiectomyTreatment',
//         accessorKey: 'previousLocalTherapyNOrchiectomyTreatment',
//         header: () => <span> Treatment</span>,
//         cell: info => info.getValue(),
//         footer: props => props.column.id,
//       },
//       {
//         id: 'previousLocalTherapyNOrchiectomyControl',
//         accessorKey: 'previousLocalTherapyNOrchiectomyControl',
//         header: () => <span> Control</span>,
//         cell: info => info.getValue(),
//         footer: props => props.column.id,
//       },
//       {
//         id: 'previousLocalTherapyNRadiotherapyTreatment',
//         accessorKey: 'previousLocalTherapyNRadiotherapyTreatment',
//         header: () => <span> Treatment</span>,
//         cell: info => info.getValue(),
//         footer: props => props.column.id,
//       },
//       {
//         id: 'previousLocalTherapyNRadiotherapyControl',
//         accessorKey: 'previousLocalTherapyNRadiotherapyControl',
//         header: () => <span> Control</span>,
//         cell: info => info.getValue(),
//         footer: props => props.column.id,
//       },
//     ]
//   },
//   {
//     id: 'ORR - N (%) ',
//     header: () => <span>ORR - N (%) </span>,
//     footer: props => props.column.id,
//     columns: [
//       {
//         id: 'orrNTreatmentOverall',
//         accessorKey: 'orrNTreatmentOverall',
//         header: () => <span> Overall</span>,
//         cell: info => info.getValue(),
//         footer: props => props.column.id,
//       },
//       {
//         id: 'orrNTreatmentCr',
//         accessorKey: 'orrNTreatmentCr',
//         header: () => <span> CR</span>,
//         cell: info => info.getValue(),
//         footer: props => props.column.id,
//       },
//       {
//         id: 'orrNTreatmentSd',
//         accessorKey: 'orrNTreatmentSd',
//         header: () => <span> SD</span>,
//         cell: info => info.getValue(),
//         footer: props => props.column.id,
//       },
//       {
//         id: 'orrNTreatmentPd',
//         accessorKey: 'orrNTreatmentPd',
//         header: () => <span> PD</span>,
//         cell: info => info.getValue(),
//         footer: props => props.column.id,
//       },
//       {
//         id: 'orrNControlOverall',
//         accessorKey: 'orrNControlOverall',
//         header: () => <span> Overall</span>,
//         cell: info => info.getValue(),
//         footer: props => props.column.id,
//       },
//       {
//         id: 'orrNControlCr',
//         accessorKey: 'orrNControlCr',
//         header: () => <span> CR</span>,
//         cell: info => info.getValue(),
//         footer: props => props.column.id,
//       },
//       {
//         id: 'orrNControlSd',
//         accessorKey: 'orrNControlSd',
//         header: () => <span> SD</span>,
//         cell: info => info.getValue(),
//         footer: props => props.column.id,
//       },
//       {
//         id: 'orrNControlPd',
//         accessorKey: 'orrNControlPd',
//         header: () => <span> PD</span>,
//         cell: info => info.getValue(),
//         footer: props => props.column.id,
//       },
//     ]
//   },
//   {
//     id: 'Adverse Events - N (%) ',
//     header: () => <span>Adverse Events - N (%) </span>,
//     footer: props => props.column.id,
//     columns: [
//       {
//         id: 'adverseEventsNAllcauseGrade3OrHigherTreatment',
//         accessorKey: 'adverseEventsNAllcauseGrade3OrHigherTreatment',
//         header: () => <span> Treatment</span>,
//         cell: info => info.getValue(),
//         footer: props => props.column.id,
//       },
//       {
//         id: 'adverseEventsNAllcauseGrade3OrHigherControl',
//         accessorKey: 'adverseEventsNAllcauseGrade3OrHigherControl',
//         header: () => <span> Control</span>,
//         cell: info => info.getValue(),
//         footer: props => props.column.id,
//       },
//       {
//         id: 'adverseEventsNTreatmentrelatedGrade3OrHigherTreatment',
//         accessorKey: 'adverseEventsNTreatmentrelatedGrade3OrHigherTreatment',
//         header: () => <span> Treatment</span>,
//         cell: info => info.getValue(),
//         footer: props => props.column.id,
//       },
//       {
//         id: 'adverseEventsNTreatmentrelatedGrade3OrHigherControl',
//         accessorKey: 'adverseEventsNTreatmentrelatedGrade3OrHigherControl',
//         header: () => <span> Control</span>,
//         cell: info => info.getValue(),
//         footer: props => props.column.id,
//       },
//       {
//         id: 'adverseEventsNTreatmentrelatedGrade5Treatment',
//         accessorKey: 'adverseEventsNTreatmentrelatedGrade5Treatment',
//         header: () => <span> Treatment</span>,
//         cell: info => info.getValue(),
//         footer: props => props.column.id,
//       },
//       {
//         id: 'adverseEventsNTreatmentrelatedGrade5Control',
//         accessorKey: 'adverseEventsNTreatmentrelatedGrade5Control',
//         header: () => <span> Control</span>,
//         cell: info => info.getValue(),
//         footer: props => props.column.id,
//       },
//     ]
//   },
//   {
//     id: 'No. of Deaths - N ',
//     header: () => <span>No. of Deaths - N </span>,
//     footer: props => props.column.id,
//     columns: [
//       {
//         id: 'noOfDeathsNTreatment',
//         accessorKey: 'noOfDeathsNTreatment',
//         header: () => <span> Treatment</span>,
//         cell: info => info.getValue(),
//         footer: props => props.column.id,
//       },
//       {
//         id: 'noOfDeathsNControl',
//         accessorKey: 'noOfDeathsNControl',
//         header: () => <span> Control</span>,
//         cell: info => info.getValue(),
//         footer: props => props.column.id,
//       },
//     ]
//   },
//   {
//     id: 'TTPSA (mo) ',
//     header: () => <span>TTPSA (mo) </span>,
//     footer: props => props.column.id,
//     columns: [
//       {
//         id: 'ttpsaMoTreatment',
//         accessorKey: 'ttpsaMoTreatment',
//         header: () => <span> Treatment</span>,
//         cell: info => info.getValue(),
//         footer: props => props.column.id,
//       },
//       {
//         id: 'ttpsaMoControl',
//         accessorKey: 'ttpsaMoControl',
//         header: () => <span> Control</span>,
//         cell: info => info.getValue(),
//         footer: props => props.column.id,
//       },
//     ]
//   },
//   {
//     id: 'OS Rate (%) ',
//     header: () => <span>OS Rate (%) </span>,
//     footer: props => props.column.id,
//     columns: [
//       {
//         id: 'osRateOverallTreatment',
//         accessorKey: 'osRateOverallTreatment',
//         header: () => <span> Treatment</span>,
//         cell: info => info.getValue(),
//         footer: props => props.column.id,
//       },
//       {
//         id: 'osRateOverallControl',
//         accessorKey: 'osRateOverallControl',
//         header: () => <span> Control</span>,
//         cell: info => info.getValue(),
//         footer: props => props.column.id,
//       },
//       {
//         id: 'osRateSynchronousTreatment',
//         accessorKey: 'osRateSynchronousTreatment',
//         header: () => <span> Treatment</span>,
//         cell: info => info.getValue(),
//         footer: props => props.column.id,
//       },
//       {
//         id: 'osRateSynchronousControl',
//         accessorKey: 'osRateSynchronousControl',
//         header: () => <span> Control</span>,
//         cell: info => info.getValue(),
//         footer: props => props.column.id,
//       },
//       {
//         id: 'osRateMetachronousTreatment',
//         accessorKey: 'osRateMetachronousTreatment',
//         header: () => <span> Treatment</span>,
//         cell: info => info.getValue(),
//         footer: props => props.column.id,
//       },
//       {
//         id: 'osRateMetachronousControl',
//         accessorKey: 'osRateMetachronousControl',
//         header: () => <span> Control</span>,
//         cell: info => info.getValue(),
//         footer: props => props.column.id,
//       },
//       {
//         id: 'osRateHighVolumeTreatment',
//         accessorKey: 'osRateHighVolumeTreatment',
//         header: () => <span> Treatment</span>,
//         cell: info => info.getValue(),
//         footer: props => props.column.id,
//       },
//       {
//         id: 'osRateHighVolumeControl',
//         accessorKey: 'osRateHighVolumeControl',
//         header: () => <span> Control</span>,
//         cell: info => info.getValue(),
//         footer: props => props.column.id,
//       },
//       {
//         id: 'osRateLowVolumeTreatment',
//         accessorKey: 'osRateLowVolumeTreatment',
//         header: () => <span> Treatment</span>,
//         cell: info => info.getValue(),
//         footer: props => props.column.id,
//       },
//       {
//         id: 'osRateLowVolumeControl',
//         accessorKey: 'osRateLowVolumeControl',
//         header: () => <span> Control</span>,
//         cell: info => info.getValue(),
//         footer: props => props.column.id,
//       },
//     ]
//   },
//   {
//     id: 'Median OS (mo) ',
//     header: () => <span>Median OS (mo) </span>,
//     footer: props => props.column.id,
//     columns: [
//       {
//         id: 'medianOsMoOverallTreatment',
//         accessorKey: 'medianOsMoOverallTreatment',
//         header: () => <span> Treatment</span>,
//         cell: info => info.getValue(),
//         footer: props => props.column.id,
//       },
//       {
//         id: 'medianOsMoOverallControl',
//         accessorKey: 'medianOsMoOverallControl',
//         header: () => <span> Control</span>,
//         cell: info => info.getValue(),
//         footer: props => props.column.id,
//       },
//       {
//         id: 'medianOsMoHighVolumeTreatment',
//         accessorKey: 'medianOsMoHighVolumeTreatment',
//         header: () => <span> Treatment</span>,
//         cell: info => info.getValue(),
//         footer: props => props.column.id,
//       },
//       {
//         id: 'medianOsMoHighVolumeControl',
//         accessorKey: 'medianOsMoHighVolumeControl',
//         header: () => <span> Control</span>,
//         cell: info => info.getValue(),
//         footer: props => props.column.id,
//       },
//       {
//         id: 'medianOsMoLowVolumeTreatment',
//         accessorKey: 'medianOsMoLowVolumeTreatment',
//         header: () => <span> Treatment</span>,
//         cell: info => info.getValue(),
//         footer: props => props.column.id,
//       },
//       {
//         id: 'medianOsMoLowVolumeControl',
//         accessorKey: 'medianOsMoLowVolumeControl',
//         header: () => <span> Control</span>,
//         cell: info => info.getValue(),
//         footer: props => props.column.id,
//       },
//     ]
//   },
//   {
//     id: 'PFS Rate (%) ',
//     header: () => <span>PFS Rate (%) </span>,
//     footer: props => props.column.id,
//     columns: [
//       {
//         id: 'pfsRateOverallTreatment',
//         accessorKey: 'pfsRateOverallTreatment',
//         header: () => <span> Treatment</span>,
//         cell: info => info.getValue(),
//         footer: props => props.column.id,
//       },
//       {
//         id: 'pfsRateOverallControl',
//         accessorKey: 'pfsRateOverallControl',
//         header: () => <span> Control</span>,
//         cell: info => info.getValue(),
//         footer: props => props.column.id,
//       },
//     ]
//   },
//   {
//     id: 'Median PFS (mo) ',
//     header: () => <span>Median PFS (mo) </span>,
//     footer: props => props.column.id,
//     columns: [
//       {
//         id: 'medianPfsMoOverallTreatment',
//         accessorKey: 'medianPfsMoOverallTreatment',
//         header: () => <span> Treatment</span>,
//         cell: info => info.getValue(),
//         footer: props => props.column.id,
//       },
//       {
//         id: 'medianPfsMoOverallControl',
//         accessorKey: 'medianPfsMoOverallControl',
//         header: () => <span> Control</span>,
//         cell: info => info.getValue(),
//         footer: props => props.column.id,
//       },
//       {
//         id: 'medianPfsMoHighVolumeTreatment',
//         accessorKey: 'medianPfsMoHighVolumeTreatment',
//         header: () => <span> Treatment</span>,
//         cell: info => info.getValue(),
//         footer: props => props.column.id,
//       },
//       {
//         id: 'medianPfsMoHighVolumeControl',
//         accessorKey: 'medianPfsMoHighVolumeControl',
//         header: () => <span> Control</span>,
//         cell: info => info.getValue(),
//         footer: props => props.column.id,
//       },
//       {
//         id: 'medianPfsMoLowVolumeTreatment',
//         accessorKey: 'medianPfsMoLowVolumeTreatment',
//         header: () => <span> Treatment</span>,
//         cell: info => info.getValue(),
//         footer: props => props.column.id,
//       },
//       {
//         id: 'medianPfsMoLowVolumeControl',
//         accessorKey: 'medianPfsMoLowVolumeControl',
//         header: () => <span> Control</span>,
//         cell: info => info.getValue(),
//         footer: props => props.column.id,
//       },
//     ]
//   },
// ]

export const columns: ColumnDef<ClinicalTrial>[] = [
  // {
  //   id: 'select',
  //   header: ({ table }) => (
  //     <IndeterminateCheckbox
  //       checked={table.getIsAllRowsSelected()}
  //       indeterminate={table.getIsSomeRowsSelected()}
  //       onChange={table.getToggleAllRowsSelectedHandler()}
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <div className="px-1">
  //       <IndeterminateCheckbox
  //         checked={row.getIsSelected()}
  //         indeterminate={row.getIsSomeSelected()}
  //         onChange={row.getToggleSelectedHandler()}
  //       />
  //     </div>
  //   ),
  // },
  {
    id: 'nct',
    accessorKey: 'nct',
    header: () => <span>NCT</span>,
    cell: info => info.getValue(),
    footer: props => props.column.id,
  },
  {
    id: 'pubmedId',
    accessorKey: 'pubmedId',
    header: () => <span>PubMed ID</span>,
    cell: info => info.getValue(),
    footer: props => props.column.id,
  },
  {
    id: 'trialName',
    accessorKey: 'trialName',
    header: () => <span>Trial Name</span>,
    cell: info => info.getValue(),
    footer: props => props.column.id,
  },
  {
    id: 'author',
    accessorKey: 'author',
    header: () => <span>Author</span>,
    cell: info => info.getValue(),
    footer: props => props.column.id,
  },
  {
    id: 'year',
    accessorKey: 'year',
    header: () => <span>Year</span>,
    cell: info => info.getValue(),
    footer: props => props.column.id,
  },
  {
    id: 'fullPubOrAbstract',
    accessorKey: 'fullPubOrAbstract',
    header: () => <span>Full Pub or Abstract</span>,
    cell: info => info.getValue(),
    footer: props => props.column.id,
  },
  {
    id: 'phase',
    accessorKey: 'phase',
    header: () => <span>Phase</span>,
    cell: info => info.getValue(),
    footer: props => props.column.id,
  },
  {
    id: 'originalfollowUp',
    accessorKey: 'originalfollowUp',
    header: () => <span>Original/Follow Up</span>,
    cell: info => info.getValue(),
    footer: props => props.column.id,
  },
  {
    id: 'numberOfArmsIncluded',
    accessorKey: 'numberOfArmsIncluded',
    header: () => <span>Number of Arms Included</span>,
    cell: info => info.getValue(),
    footer: props => props.column.id,
  },
  {
    id: 'treatmentArms',
    accessorKey: 'treatmentArms',
    header: () => <span>Treatment Arm(s)</span>,
    cell: info => info.getValue(),
    footer: props => props.column.id,
  },
  {
    id: 'controlArm',
    accessorKey: 'controlArm',
    header: () => <span>Control Arm</span>,
    cell: info => info.getValue(),
    footer: props => props.column.id,
  },
  {
    id: 'classOfAgentInTreatmentArm1',
    accessorKey: 'classOfAgentInTreatmentArm1',
    header: () => <span>Class of Agent in Treatment Arm 1</span>,
    cell: info => info.getValue(),
    footer: props => props.column.id,
  },
  {
    id: 'treatmentArm1Regimen',
    accessorKey: 'treatmentArm1Regimen',
    header: () => <span>Treatment Arm 1 Regimen</span>,
    cell: info => info.getValue(),
    footer: props => props.column.id,
  },
  {
    id: 'totalParticipantsN',
    accessorKey: 'totalParticipantsN',
    header: () => <span>Total Participants - N</span>,
    cell: info => info.getValue(),
    footer: props => props.column.id,
  },
  {
    id: 'treatmentArmN',
    accessorKey: 'treatmentArmN',
    header: () => <span>Treatment Arm - N</span>,
    cell: info => info.getValue(),
    footer: props => props.column.id,
  },
  {
    id: 'controlArmN',
    accessorKey: 'controlArmN',
    header: () => <span>Control Arm - N</span>,
    cell: info => info.getValue(),
    footer: props => props.column.id,
  },
  {
    id: 'medianFollowupDurationMo',
    accessorKey: 'medianFollowupDurationMo',
    header: () => <span>Median Follow-Up Duration (mo)</span>,
    cell: info => info.getValue(),
    footer: props => props.column.id,
  },
  {
    header: 'Median On-Treatment Duration (mo)',
    id: 'Median On-Treatment Duration (mo)',
    footer: props => props.column.id,
    columns: [
      {
        id: 'medianOntreatmentDurationMoTreatment',
        accessorKey: 'medianOntreatmentDurationMoTreatment',
        header: () => <span>Treatment</span>,
        cell: info => info.getValue(),
        footer: props => props.column.id,
      },
      {
        id: 'medianOntreatmentDurationMoControl',
        accessorKey: 'medianOntreatmentDurationMoControl',
        header: () => <span>Control </span>,
        cell: info => info.getValue(),
        footer: props => props.column.id,
      },
    ],
  },
  {
    id: 'qualityOfLifeReported',
    accessorKey: 'qualityOfLifeReported',
    header: () => <span>Quality of Life reported</span>,
    cell: info => info.getValue(),
    footer: props => props.column.id,
  },
  {
    id: 'qualityOfLifeScale',
    accessorKey: 'qualityOfLifeScale',
    header: () => <span>Quality of Life Scale</span>,
    cell: info => info.getValue(),
    footer: props => props.column.id,
  },
  {
    header: 'Reporting by prognostic groups - Y/N',
    id: 'Reporting by prognostic groups - Y/N',
    footer: props => props.column.id,
    columns: [
      {
        id: 'reportingByPrognosticGroupsYnSynchronous',
        accessorKey: 'reportingByPrognosticGroupsYnSynchronous',
        header: () => <span>Synchronous</span>,
        cell: info => info.getValue(),
        footer: props => props.column.id,
      },
      {
        id: 'reportingByPrognosticGroupsYnMetachronous',
        accessorKey: 'reportingByPrognosticGroupsYnMetachronous',
        header: () => <span>Metachronous</span>,
        cell: info => info.getValue(),
        footer: props => props.column.id,
      },
      {
        id: 'reportingByPrognosticGroupsYnHighVolume',
        accessorKey: 'reportingByPrognosticGroupsYnHighVolume',
        header: () => <span>High volume</span>,
        cell: info => info.getValue(),
        footer: props => props.column.id,
      },
      {
        id: 'reportingByPrognosticGroupsYnLowVolume',
        accessorKey: 'reportingByPrognosticGroupsYnLowVolume',
        header: () => <span>Low volume</span>,
        cell: info => info.getValue(),
        footer: props => props.column.id,
      },
    ],
  },
  {
    header: 'Mode of metastases - N (%)',
    id: 'Mode of metastases - N (%)',
    footer: props => props.column.id,
    columns: [
      {
        header: 'Synchronous',
        id: 'Synchronous',
        footer: props => props.column.id,
        columns: [
          {
            id: 'modeOfMetastasesNSynchronousTreatment',
            accessorKey: 'modeOfMetastasesNSynchronousTreatment',
            header: () => <span>Treatment</span>,
            cell: info => info.getValue(),
            footer: props => props.column.id,
          },
          {
            id: 'modeOfMetastasesNSynchronousControl',
            accessorKey: 'modeOfMetastasesNSynchronousControl',
            header: () => <span>Control</span>,
            cell: info => info.getValue(),
            footer: props => props.column.id,
          },
        ],
      },
      {
        header: 'Metachronous',
        id: 'Metachronous',
        footer: props => props.column.id,
        columns: [
          {
            id: 'modeOfMetastasesNMetachronousTreatment',
            accessorKey: 'modeOfMetastasesNMetachronousTreatment',
            header: () => <span>Treatment</span>,
            cell: info => info.getValue(),
            footer: props => props.column.id,
          },
          {
            id: 'modeOfMetastasesNMetachronousControl',
            accessorKey: 'modeOfMetastasesNMetachronousControl',
            header: () => <span>Control</span>,
            cell: info => info.getValue(),
            footer: props => props.column.id,
          },
        ],
      },
    ],
  },
  {
    header: 'Volume of disease - N (%)',
    id: 'Volume of disease - N (%)',
    footer: props => props.column.id,
    columns: [
      {
        header: 'High',
        id: 'High',
        footer: props => props.column.id,
        columns: [
          {
            id: 'volumeOfDiseaseNHighTreatment',
            accessorKey: 'volumeOfDiseaseNHighTreatment',
            header: () => <span>Treatment</span>,
            cell: info => info.getValue(),
            footer: props => props.column.id,
          },
          {
            id: 'volumeOfDiseaseNHighControl',
            accessorKey: 'volumeOfDiseaseNHighControl',
            header: () => <span>Control</span>,
            cell: info => info.getValue(),
            footer: props => props.column.id,
          },
        ],
      },
      {
        header: 'Low',
        id: 'Low',
        footer: props => props.column.id,
        columns: [
          {
            id: 'volumeOfDiseaseNLowTreatment',
            accessorKey: 'volumeOfDiseaseNLowTreatment',
            header: () => <span>Treatment</span>,
            cell: info => info.getValue(),
            footer: props => props.column.id,
          },
          {
            id: 'volumeOfDiseaseNLowControl',
            accessorKey: 'volumeOfDiseaseNLowControl',
            header: () => <span>Control</span>,
            cell: info => info.getValue(),
            footer: props => props.column.id,
          },
        ],
      },
    ],
  },
  {
    header: 'Docetaxel administration - N (%)',
    id: 'Docetaxel administration - N (%)',
    footer: props => props.column.id,
    columns: [
      {
        id: 'docetaxelAdministrationNTreatment',
        accessorKey: 'docetaxelAdministrationNTreatment',
        header: () => <span>Treatment</span>,
        cell: info => info.getValue(),
        footer: props => props.column.id,
      },
      {
        id: 'docetaxelAdministrationNControl',
        accessorKey: 'docetaxelAdministrationNControl',
        header: () => <span>Control</span>,
        cell: info => info.getValue(),
        footer: props => props.column.id,
      },
    ],
  },
  {
    header: 'Median Age (years)',
    id: 'Median Age (years)',
    footer: props => props.column.id,
    columns: [
      {
        id: 'medianAgeYearsTreatment',
        accessorKey: 'medianAgeYearsTreatment',
        header: () => <span>Treatment</span>,
        cell: info => info.getValue(),
        footer: props => props.column.id,
      },
      {
        id: 'medianAgeYearsControl',
        accessorKey: 'medianAgeYearsControl',
        header: () => <span>Control</span>,
        cell: info => info.getValue(),
        footer: props => props.column.id,
      },
    ],
  },
  {
    header: 'Race - N (%)',
    id: 'Race - N (%)',
    footer: props => props.column.id,
    columns: [
      {
        header: 'White',
        id: 'White',
        footer: props => props.column.id,
        columns: [
          {
            id: 'raceNWhiteTreatment',
            accessorKey: 'raceNWhiteTreatment',
            header: () => <span>Treatment</span>,
            cell: info => info.getValue(),
            footer: props => props.column.id,
          },
          {
            id: 'raceNWhiteControl',
            accessorKey: 'raceNWhiteControl',
            header: () => <span>Control</span>,
            cell: info => info.getValue(),
            footer: props => props.column.id,
          },
        ],
      },
      {
        header: 'Black or African American',
        id: 'Black or African American',
        footer: props => props.column.id,
        columns: [
          {
            id: 'raceNBlackOrAfricanAmericanTreatment',
            accessorKey: 'raceNBlackOrAfricanAmericanTreatment',
            header: () => <span>Treatment</span>,
            cell: info => info.getValue(),
            footer: props => props.column.id,
          },
          {
            id: 'raceNBlackOrAfricanAmericanControl',
            accessorKey: 'raceNBlackOrAfricanAmericanControl',
            header: () => <span>Control</span>,
            cell: info => info.getValue(),
            footer: props => props.column.id,
          },
        ],
      },
      {
        header: 'Asian',
        id: 'Asian',
        footer: props => props.column.id,
        columns: [
          {
            id: 'raceNAsianTreatment',
            accessorKey: 'raceNAsianTreatment',
            header: () => <span>Treatment</span>,
            cell: info => info.getValue(),
            footer: props => props.column.id,
          },
          {
            id: 'raceNAsianControl',
            accessorKey: 'raceNAsianControl',
            header: () => <span>Control</span>,
            cell: info => info.getValue(),
            footer: props => props.column.id,
          },
        ],
      },
      {
        header: 'Nat. Hawaiian or Pac. Islander',
        id: 'Nat. Hawaiian or Pac. Islander',
        footer: props => props.column.id,
        columns: [
          {
            id: 'raceNNatHawaiianOrPacIslanderTreatment',
            accessorKey: 'raceNNatHawaiianOrPacIslanderTreatment',
            header: () => <span>Treatment</span>,
            cell: info => info.getValue(),
            footer: props => props.column.id,
          },
          {
            id: 'raceNNatHawaiianOrPacIslanderControl',
            accessorKey: 'raceNNatHawaiianOrPacIslanderControl',
            header: () => <span>Control</span>,
            cell: info => info.getValue(),
            footer: props => props.column.id,
          },
        ],
      },
      {
        header: 'Amer. Indian or Alaska Nat.',
        id: 'Amer. Indian or Alaska Nat.',
        footer: props => props.column.id,
        columns: [
          {
            id: 'raceNAmerIndianOrAlaskaNatTreatment',
            accessorKey: 'raceNAmerIndianOrAlaskaNatTreatment',
            header: () => <span>Treatment</span>,
            cell: info => info.getValue(),
            footer: props => props.column.id,
          },
          {
            id: 'raceNAmerIndianOrAlaskaNatControl',
            accessorKey: 'raceNAmerIndianOrAlaskaNatControl',
            header: () => <span>Control</span>,
            cell: info => info.getValue(),
            footer: props => props.column.id,
          },
        ],
      },
      {
        header: 'Other',
        id: 'Other',
        footer: props => props.column.id,
        columns: [
          {
            id: 'raceNOtherTreatment',
            accessorKey: 'raceNOtherTreatment',
            header: () => <span>Treatment</span>,
            cell: info => info.getValue(),
            footer: props => props.column.id,
          },
          {
            id: 'raceNOtherControl',
            accessorKey: 'raceNOtherControl',
            header: () => <span>Control</span>,
            cell: info => info.getValue(),
            footer: props => props.column.id,
          },
        ],
      },
      {
        header: 'Unknown',
        id: 'Unknown',
        footer: props => props.column.id,
        columns: [
          {
            id: 'raceNUnknownTreatment',
            accessorKey: 'raceNUnknownTreatment',
            header: () => <span>Treatment</span>,
            cell: info => info.getValue(),
            footer: props => props.column.id,
          },
          {
            id: 'raceNUnknownControl',
            accessorKey: 'raceNUnknownControl',
            header: () => <span>Control</span>,
            cell: info => info.getValue(),
            footer: props => props.column.id,
          },
        ],
      },
    ],
  },
  {
    header: 'Region - N (%)',
    id: 'Region - N (%)',
    footer: props => props.column.id,
    columns: [
      {
        header: 'North America',
        id: 'North America',
        footer: props => props.column.id,
        columns: [
          {
            id: 'regionNNorthAmericaTreatment',
            accessorKey: 'regionNNorthAmericaTreatment',
            header: () => <span>Treatment</span>,
            cell: info => info.getValue(),
            footer: props => props.column.id,
          },
          {
            id: 'regionNNorthAmericaControl',
            accessorKey: 'regionNNorthAmericaControl',
            header: () => <span>Control</span>,
            cell: info => info.getValue(),
            footer: props => props.column.id,
          },
        ],
      },
      {
        header: 'South America',
        id: 'South America',
        footer: props => props.column.id,
        columns: [
          {
            id: 'regionNSouthAmericaTreatment',
            accessorKey: 'regionNSouthAmericaTreatment',
            header: () => <span>Treatment</span>,
            cell: info => info.getValue(),
            footer: props => props.column.id,
          },
          {
            id: 'regionNSouthAmericaControl',
            accessorKey: 'regionNSouthAmericaControl',
            header: () => <span>Control</span>,
            cell: info => info.getValue(),
            footer: props => props.column.id,
          },
        ],
      },
      {
        header: 'Europe',
        id: 'Europe',
        footer: props => props.column.id,
        columns: [
          {
            id: 'regionNEuropeTreatment',
            accessorKey: 'regionNEuropeTreatment',
            header: () => <span>Treatment</span>,
            cell: info => info.getValue(),
            footer: props => props.column.id,
          },
          {
            id: 'regionNEuropeControl',
            accessorKey: 'regionNEuropeControl',
            header: () => <span>Control</span>,
            cell: info => info.getValue(),
            footer: props => props.column.id,
          },
        ],
      },
      {
        header: 'Africa',
        id: 'Africa',
        footer: props => props.column.id,
        columns: [
          {
            id: 'regionNAfricaTreatment',
            accessorKey: 'regionNAfricaTreatment',
            header: () => <span>Treatment</span>,
            cell: info => info.getValue(),
            footer: props => props.column.id,
          },
          {
            id: 'regionNAfricaControl',
            accessorKey: 'regionNAfricaControl',
            header: () => <span>Control</span>,
            cell: info => info.getValue(),
            footer: props => props.column.id,
          },
        ],
      },
      {
        header: 'Asia',
        id: 'Asia',
        footer: props => props.column.id,
        columns: [
          {
            id: 'regionNAsiaTreatment',
            accessorKey: 'regionNAsiaTreatment',
            header: () => <span>Treatment</span>,
            cell: info => info.getValue(),
            footer: props => props.column.id,
          },
          {
            id: 'regionNAsiaControl',
            accessorKey: 'regionNAsiaControl',
            header: () => <span>Control</span>,
            cell: info => info.getValue(),
            footer: props => props.column.id,
          },
        ],
      },
      {
        header: 'Oceania',
        id: 'Oceania',
        footer: props => props.column.id,
        columns: [
          {
            id: 'regionNOceaniaTreatment',
            accessorKey: 'regionNOceaniaTreatment',
            header: () => <span>Treatment</span>,
            cell: info => info.getValue(),
            footer: props => props.column.id,
          },
          {
            id: 'regionNOceaniaControl',
            accessorKey: 'regionNOceaniaControl',
            header: () => <span>Control</span>,
            cell: info => info.getValue(),
            footer: props => props.column.id,
          },
        ],
      },
    ],
  },
  {
    header: 'PS - N (%)',
    id: 'PS - N (%)',
    footer: props => props.column.id,
    columns: [
      {
        header: '0',
        id: '0',
        footer: props => props.column.id,
        columns: [
          {
            id: 'psN0Treatment',
            accessorKey: 'psN0Treatment',
            header: () => <span>Treatment</span>,
            cell: info => info.getValue(),
            footer: props => props.column.id,
          },
          {
            id: 'psN0Control',
            accessorKey: 'psN0Control',
            header: () => <span>Control</span>,
            cell: info => info.getValue(),
            footer: props => props.column.id,
          },
        ],
      },
      {
        header: '1-2',
        id: '1-2',
        footer: props => props.column.id,
        columns: [
          {
            id: 'psN12Treatment',
            accessorKey: 'psN12Treatment',
            header: () => <span>Treatment</span>,
            cell: info => info.getValue(),
            footer: props => props.column.id,
          },
          {
            id: 'psN12Control',
            accessorKey: 'psN12Control',
            header: () => <span>Control</span>,
            cell: info => info.getValue(),
            footer: props => props.column.id,
          },
        ],
      },
    ],
  },
  {
    header: 'Gleason score - N (%)',
    id: 'Gleason score - N (%)',
    footer: props => props.column.id,
    columns: [
      {
        header: '≤ 7',
        id: '≤ 7',
        footer: props => props.column.id,
        columns: [
          {
            id: 'gleasonScoreN7Treatment',
            accessorKey: 'gleasonScoreN7Treatment',
            header: () => <span>Treatment</span>,
            cell: info => info.getValue(),
            footer: props => props.column.id,
          },
          {
            id: 'gleasonScoreN7Control',
            accessorKey: 'gleasonScoreN7Control',
            header: () => <span>Control</span>,
            cell: info => info.getValue(),
            footer: props => props.column.id,
          },
        ],
      },
      {
        header: '≥ 8',
        id: '≥ 8',
        footer: props => props.column.id,
        columns: [
          {
            id: 'gleasonScoreN8Treatment',
            accessorKey: 'gleasonScoreN8Treatment',
            header: () => <span>Treatment</span>,
            cell: info => info.getValue(),
            footer: props => props.column.id,
          },
          {
            id: 'gleasonScoreN8Control',
            accessorKey: 'gleasonScoreN8Control',
            header: () => <span>Control</span>,
            cell: info => info.getValue(),
            footer: props => props.column.id,
          },
        ],
      },
    ],
  },
  {
    header: 'Metastases - N (%)',
    id: 'Metastases - N (%)',
    footer: props => props.column.id,
    columns: [
      {
        header: 'Liver',
        id: 'Liver',
        footer: props => props.column.id,
        columns: [
          {
            id: 'metastasesNLiverTreatment',
            accessorKey: 'metastasesNLiverTreatment',
            header: () => <span>Treatment</span>,
            cell: info => info.getValue(),
            footer: props => props.column.id,
          },
          {
            id: 'metastasesNLiverControl',
            accessorKey: 'metastasesNLiverControl',
            header: () => <span>Control</span>,
            cell: info => info.getValue(),
            footer: props => props.column.id,
          },
        ],
      },
      {
        header: 'Lungs',
        id: 'Lungs',
        footer: props => props.column.id,
        columns: [
          {
            id: 'metastasesNLungsTreatment',
            accessorKey: 'metastasesNLungsTreatment',
            header: () => <span>Treatment</span>,
            cell: info => info.getValue(),
            footer: props => props.column.id,
          },
          {
            id: 'metastasesNLungsControl',
            accessorKey: 'metastasesNLungsControl',
            header: () => <span>Control</span>,
            cell: info => info.getValue(),
            footer: props => props.column.id,
          },
        ],
      },
      {
        header: 'Bone',
        id: 'Bone',
        footer: props => props.column.id,
        columns: [
          {
            id: 'metastasesNBoneTreatment',
            accessorKey: 'metastasesNBoneTreatment',
            header: () => <span>Treatment</span>,
            cell: info => info.getValue(),
            footer: props => props.column.id,
          },
          {
            id: 'metastasesNBoneControl',
            accessorKey: 'metastasesNBoneControl',
            header: () => <span>Control</span>,
            cell: info => info.getValue(),
            footer: props => props.column.id,
          },
        ],
      },
      {
        header: 'Nodal',
        id: 'Nodal',
        footer: props => props.column.id,
        columns: [
          {
            id: 'metastasesNNodalTreatment',
            accessorKey: 'metastasesNNodalTreatment',
            header: () => <span>Treatment</span>,
            cell: info => info.getValue(),
            footer: props => props.column.id,
          },
          {
            id: 'metastasesNNodalControl',
            accessorKey: 'metastasesNNodalControl',
            header: () => <span>Control</span>,
            cell: info => info.getValue(),
            footer: props => props.column.id,
          },
        ],
      },
    ],
  },
  {
    header: 'Previous local therapy - N (%)',
    id: 'Previous local therapy - N (%)',
    footer: props => props.column.id,
    columns: [
      {
        header: 'Prostatectomy',
        id: 'Prostatectomy',
        footer: props => props.column.id,
        columns: [
          {
            id: 'previousLocalTherapyNProstatectomyTreatment',
            accessorKey: 'previousLocalTherapyNProstatectomyTreatment',
            header: () => <span>Treatment</span>,
            cell: info => info.getValue(),
            footer: props => props.column.id,
          },
          {
            id: 'previousLocalTherapyNProstatectomyControl',
            accessorKey: 'previousLocalTherapyNProstatectomyControl',
            header: () => <span>Control</span>,
            cell: info => info.getValue(),
            footer: props => props.column.id,
          },
        ],
      },
      {
        header: 'Orchiectomy',
        id: 'Orchiectomy',
        footer: props => props.column.id,
        columns: [
          {
            id: 'previousLocalTherapyNOrchiectomyTreatment',
            accessorKey: 'previousLocalTherapyNOrchiectomyTreatment',
            header: () => <span>Treatment</span>,
            cell: info => info.getValue(),
            footer: props => props.column.id,
          },
          {
            id: 'previousLocalTherapyNOrchiectomyControl',
            accessorKey: 'previousLocalTherapyNOrchiectomyControl',
            header: () => <span>Control</span>,
            cell: info => info.getValue(),
            footer: props => props.column.id,
          },
        ],
      },
      {
        header: 'Radiotherapy',
        id: 'Radiotherapy',
        footer: props => props.column.id,
        columns: [
          {
            id: 'previousLocalTherapyNRadiotherapyTreatment',
            accessorKey: 'previousLocalTherapyNRadiotherapyTreatment',
            header: () => <span>Treatment</span>,
            cell: info => info.getValue(),
            footer: props => props.column.id,
          },
          {
            id: 'previousLocalTherapyNRadiotherapyControl',
            accessorKey: 'previousLocalTherapyNRadiotherapyControl',
            header: () => <span>Control</span>,
            cell: info => info.getValue(),
            footer: props => props.column.id,
          },
        ],
      },
    ],
  },
  {
    id: 'primaryEndpoints',
    accessorKey: 'primaryEndpoints',
    header: () => <span>Primary Endpoint(s)</span>,
    cell: info => info.getValue(),
    footer: props => props.column.id,
  },
  {
    id: 'secondaryEndpoints',
    accessorKey: 'secondaryEndpoints',
    header: () => <span>Secondary Endpoint(s)</span>,
    cell: info => info.getValue(),
    footer: props => props.column.id,
  },
  {
    header: 'ORR - N (%)',
    id: 'ORR - N (%)',
    footer: props => props.column.id,
    columns: [
      {
        header: 'Treatment',
        id: 'Treatment',
        footer: props => props.column.id,
        columns: [
          {
            id: 'orrNTreatmentOverall',
            accessorKey: 'orrNTreatmentOverall',
            header: () => <span>Overall</span>,
            cell: info => info.getValue(),
            footer: props => props.column.id,
          },
          {
            id: 'orrNTreatmentCr',
            accessorKey: 'orrNTreatmentCr',
            header: () => <span>CR</span>,
            cell: info => info.getValue(),
            footer: props => props.column.id,
          },
          {
            id: 'orrNTreatmentSd',
            accessorKey: 'orrNTreatmentSd',
            header: () => <span>SD</span>,
            cell: info => info.getValue(),
            footer: props => props.column.id,
          },
          {
            id: 'orrNTreatmentPd',
            accessorKey: 'orrNTreatmentPd',
            header: () => <span>PD</span>,
            cell: info => info.getValue(),
            footer: props => props.column.id,
          },
        ],
      },
      {
        header: 'Control',
        id: 'Control',
        footer: props => props.column.id,
        columns: [
          {
            id: 'orrNControlOverall',
            accessorKey: 'orrNControlOverall',
            header: () => <span>Overall</span>,
            cell: info => info.getValue(),
            footer: props => props.column.id,
          },
          {
            id: 'orrNControlCr',
            accessorKey: 'orrNControlCr',
            header: () => <span>CR</span>,
            cell: info => info.getValue(),
            footer: props => props.column.id,
          },
          {
            id: 'orrNControlSd',
            accessorKey: 'orrNControlSd',
            header: () => <span>SD</span>,
            cell: info => info.getValue(),
            footer: props => props.column.id,
          },
          {
            id: 'orrNControlPd',
            accessorKey: 'orrNControlPd',
            header: () => <span>PD</span>,
            cell: info => info.getValue(),
            footer: props => props.column.id,
          },
        ],
      },
    ],
  },
  {
    header: 'Adverse Events - N (%)',
    id: 'Adverse Events - N (%)',
    footer: props => props.column.id,
    columns: [
      {
        header: 'All-Cause Grade 3 or Higher',
        id: 'All-Cause Grade 3 or Higher',
        footer: props => props.column.id,
        columns: [
          {
            id: 'adverseEventsNAllcauseGrade3OrHigherTreatment',
            accessorKey: 'adverseEventsNAllcauseGrade3OrHigherTreatment',
            header: () => <span>Treatment</span>,
            cell: info => info.getValue(),
            footer: props => props.column.id,
          },
          {
            id: 'adverseEventsNAllcauseGrade3OrHigherControl',
            accessorKey: 'adverseEventsNAllcauseGrade3OrHigherControl',
            header: () => <span>Control</span>,
            cell: info => info.getValue(),
            footer: props => props.column.id,
          },
        ],
      },
      {
        header: 'Treatment-related Grade 3 or Higher',
        id: 'Treatment-related Grade 3 or Higher',
        footer: props => props.column.id,
        columns: [
          {
            id: 'adverseEventsNTreatmentrelatedGrade3OrHigherTreatment',
            accessorKey: 'adverseEventsNTreatmentrelatedGrade3OrHigherTreatment',
            header: () => <span>Treatment</span>,
            cell: info => info.getValue(),
            footer: props => props.column.id,
          },
          {
            id: 'adverseEventsNTreatmentrelatedGrade3OrHigherControl',
            accessorKey: 'adverseEventsNTreatmentrelatedGrade3OrHigherControl',
            header: () => <span>Control</span>,
            cell: info => info.getValue(),
            footer: props => props.column.id,
          },
        ],
      },
      {
        header: 'Treatment-related Grade 5',
        id: 'Treatment-related Grade 5',
        footer: props => props.column.id,
        columns: [
          {
            id: 'adverseEventsNTreatmentrelatedGrade5Treatment',
            accessorKey: 'adverseEventsNTreatmentrelatedGrade5Treatment',
            header: () => <span>Treatment</span>,
            cell: info => info.getValue(),
            footer: props => props.column.id,
          },
          {
            id: 'adverseEventsNTreatmentrelatedGrade5Control',
            accessorKey: 'adverseEventsNTreatmentrelatedGrade5Control',
            header: () => <span>Control</span>,
            cell: info => info.getValue(),
            footer: props => props.column.id,
          },
        ],
      },
    ],
  },
  {
    header: 'No. of Deaths - N',
    id: 'No. of Deaths - N',
    footer: props => props.column.id,
    columns: [
      {
        id: 'noOfDeathsNTreatment',
        accessorKey: 'noOfDeathsNTreatment',
        header: () => <span>Treatment</span>,
        cell: info => info.getValue(),
        footer: props => props.column.id,
      },
      {
        id: 'noOfDeathsNControl',
        accessorKey: 'noOfDeathsNControl',
        header: () => <span>Control</span>,
        cell: info => info.getValue(),
        footer: props => props.column.id,
      },
    ],
  },
  {
    header: 'TTPSA (mo)',
    id: 'TTPSA (mo)',
    footer: props => props.column.id,
    columns: [
      {
        id: 'ttpsaMoTreatment',
        accessorKey: 'ttpsaMoTreatment',
        header: () => <span>Treatment</span>,
        cell: info => info.getValue(),
        footer: props => props.column.id,
      },
      {
        id: 'ttpsaMoControl',
        accessorKey: 'ttpsaMoControl',
        header: () => <span>Control</span>,
        cell: info => info.getValue(),
        footer: props => props.column.id,
      },
    ],
  },
  {
    header: 'OS Rate (%)',
    id: 'OS Rate (%)',
    footer: props => props.column.id,
    columns: [
      {
        header: 'Overall',
        id: 'Overall',
        footer: props => props.column.id,
        columns: [
          {
            id: 'osRateOverallTreatment',
            accessorKey: 'osRateOverallTreatment',
            header: () => <span>Treatment</span>,
            cell: info => info.getValue(),
            footer: props => props.column.id,
          },
          {
            id: 'osRateOverallControl',
            accessorKey: 'osRateOverallControl',
            header: () => <span>Control</span>,
            cell: info => info.getValue(),
            footer: props => props.column.id,
          },
        ],
      },
      {
        header: 'Synchronous',
        id: 'Synchronous',
        footer: props => props.column.id,
        columns: [
          {
            id: 'osRateSynchronousTreatment',
            accessorKey: 'osRateSynchronousTreatment',
            header: () => <span>Treatment</span>,
            cell: info => info.getValue(),
            footer: props => props.column.id,
          },
          {
            id: 'osRateSynchronousControl',
            accessorKey: 'osRateSynchronousControl',
            header: () => <span>Control</span>,
            cell: info => info.getValue(),
            footer: props => props.column.id,
          },
        ],
      },
      {
        header: 'Metachronous',
        id: 'Metachronous',
        footer: props => props.column.id,
        columns: [
          {
            id: 'osRateMetachronousTreatment',
            accessorKey: 'osRateMetachronousTreatment',
            header: () => <span>Treatment</span>,
            cell: info => info.getValue(),
            footer: props => props.column.id,
          },
          {
            id: 'osRateMetachronousControl',
            accessorKey: 'osRateMetachronousControl',
            header: () => <span>Control</span>,
            cell: info => info.getValue(),
            footer: props => props.column.id,
          },
        ],
      },
      {
        header: 'High volume',
        id: 'High volume',
        footer: props => props.column.id,
        columns: [
          {
            id: 'osRateHighVolumeTreatment',
            accessorKey: 'osRateHighVolumeTreatment',
            header: () => <span>Treatment</span>,
            cell: info => info.getValue(),
            footer: props => props.column.id,
          },
          {
            id: 'osRateHighVolumeControl',
            accessorKey: 'osRateHighVolumeControl',
            header: () => <span>Control</span>,
            cell: info => info.getValue(),
            footer: props => props.column.id,
          },
        ],
      },
      {
        header: 'Low volume',
        id: 'Low volume',
        footer: props => props.column.id,
        columns: [
          {
            id: 'osRateLowVolumeTreatment',
            accessorKey: 'osRateLowVolumeTreatment',
            header: () => <span>Treatment</span>,
            cell: info => info.getValue(),
            footer: props => props.column.id,
          },
          {
            id: 'osRateLowVolumeControl',
            accessorKey: 'osRateLowVolumeControl',
            header: () => <span>Control</span>,
            cell: info => info.getValue(),
            footer: props => props.column.id,
          },
        ],
      },
    ],
  },
  {
    header: 'Median OS (mo)',
    id: 'Median OS (mo)',
    footer: props => props.column.id,
    columns: [
      {
        header: 'Overall',
        id: 'Overall',
        footer: props => props.column.id,
        columns: [
          {
            id: 'medianOsMoOverallTreatment',
            accessorKey: 'medianOsMoOverallTreatment',
            header: () => <span>Treatment</span>,
            cell: info => info.getValue(),
            footer: props => props.column.id,
          },
          {
            id: 'medianOsMoOverallControl',
            accessorKey: 'medianOsMoOverallControl',
            header: () => <span>Control</span>,
            cell: info => info.getValue(),
            footer: props => props.column.id,
          },
        ],
      },
      {
        header: 'High volume',
        id: 'High volume',
        footer: props => props.column.id,
        columns: [
          {
            id: 'medianOsMoHighVolumeTreatment',
            accessorKey: 'medianOsMoHighVolumeTreatment',
            header: () => <span>Treatment</span>,
            cell: info => info.getValue(),
            footer: props => props.column.id,
          },
          {
            id: 'medianOsMoHighVolumeControl',
            accessorKey: 'medianOsMoHighVolumeControl',
            header: () => <span>Control</span>,
            cell: info => info.getValue(),
            footer: props => props.column.id,
          },
        ],
      },
      {
        header: 'Low volume',
        id: 'Low volume',
        footer: props => props.column.id,
        columns: [
          {
            id: 'medianOsMoLowVolumeTreatment',
            accessorKey: 'medianOsMoLowVolumeTreatment',
            header: () => <span>Treatment</span>,
            cell: info => info.getValue(),
            footer: props => props.column.id,
          },
          {
            id: 'medianOsMoLowVolumeControl',
            accessorKey: 'medianOsMoLowVolumeControl',
            header: () => <span>Control</span>,
            cell: info => info.getValue(),
            footer: props => props.column.id,
          },
        ],
      },
    ],
  },
  {
    header: 'PFS Rate (%)',
    id: 'PFS Rate (%)',
    footer: props => props.column.id,
    columns: [
      {
        header: 'Overall',
        id: 'Overall',
        footer: props => props.column.id,
        columns: [
          {
            id: 'pfsRateOverallTreatment',
            accessorKey: 'pfsRateOverallTreatment',
            header: () => <span>Treatment</span>,
            cell: info => info.getValue(),
            footer: props => props.column.id,
          },
          {
            id: 'pfsRateOverallControl',
            accessorKey: 'pfsRateOverallControl',
            header: () => <span>Control</span>,
            cell: info => info.getValue(),
            footer: props => props.column.id,
          },
        ],
      },
    ],
  },
  {
    header: 'Median PFS (mo)',
    id: 'Median PFS (mo)',
    footer: props => props.column.id,
    columns: [
      {
        header: 'Overall',
        id: 'Overall',
        footer: props => props.column.id,
        columns: [
          {
            id: 'medianPfsMoOverallTreatment',
            accessorKey: 'medianPfsMoOverallTreatment',
            header: () => <span>Treatment</span>,
            cell: info => info.getValue(),
            footer: props => props.column.id,
          },
          {
            id: 'medianPfsMoOverallControl',
            accessorKey: 'medianPfsMoOverallControl',
            header: () => <span>Control</span>,
            cell: info => info.getValue(),
            footer: props => props.column.id,
          },
        ],
      },
      {
        header: 'High volume',
        id: 'High volume',
        footer: props => props.column.id,
        columns: [
          {
            id: 'medianPfsMoHighVolumeTreatment',
            accessorKey: 'medianPfsMoHighVolumeTreatment',
            header: () => <span>Treatment</span>,
            cell: info => info.getValue(),
            footer: props => props.column.id,
          },
          {
            id: 'medianPfsMoHighVolumeControl',
            accessorKey: 'medianPfsMoHighVolumeControl',
            header: () => <span>Control</span>,
            cell: info => info.getValue(),
            footer: props => props.column.id,
          },
        ],
      },
      {
        header: 'Low volume',
        id: 'Low volume',
        footer: props => props.column.id,
        columns: [
          {
            id: 'medianPfsMoLowVolumeTreatment',
            accessorKey: 'medianPfsMoLowVolumeTreatment',
            header: () => <span>Treatment</span>,
            cell: info => info.getValue(),
            footer: props => props.column.id,
          },
          {
            id: 'medianPfsMoLowVolumeControl',
            accessorKey: 'medianPfsMoLowVolumeControl',
            header: () => <span>Control</span>,
            cell: info => info.getValue(),
            footer: props => props.column.id,
          },
        ],
      },
    ],
  },
  {
    id: 'addonTreatment',
    accessorKey: 'addonTreatment',
    header: () => <span>Add-on Treatment</span>,
    cell: info => info.getValue(),
    footer: props => props.column.id,
  },
  {
    id: 'treatmentClass',
    accessorKey: 'treatmentClass',
    header: () => <span>Treatment Class</span>,
    cell: info => info.getValue(),
    footer: props => props.column.id,
  },
  {
    id: 'typeOfTherapy',
    accessorKey: 'typeOfTherapy',
    header: () => <span>Type of Therapy</span>,
    cell: info => info.getValue(),
    footer: props => props.column.id,
  },
]

// export const getTableMeta = (
//   setData: React.Dispatch<React.SetStateAction<Person[]>>,
//   skipAutoResetPageIndex: () => void
// ) =>
//   ({
//     updateData: (rowIndex, columnId, value) => {
//       // Skip age index reset until after next rerender
//       skipAutoResetPageIndex()
//       setData(old =>
//         old.map((row, index) => {
//           if (index !== rowIndex) return row

//           return {
//             ...old[rowIndex]!,
//             [columnId]: value,
//           }
//         })
//       )
//     },
//   }) as TableMeta

export const getTableMeta = (
  setData: React.Dispatch<React.SetStateAction<ClinicalTrial[]>>,
  skipAutoResetPageIndex: () => void
) =>
  ({
    updateData: (rowIndex, columnId, value) => {
      // Skip age index reset until after next rerender
      skipAutoResetPageIndex()
      setData(old =>
        old.map((row, index) => {
          if (index !== rowIndex) return row

          return {
            ...old[rowIndex]!,
            [columnId]: value,
          }
        })
      )
    },
  }) as TableMeta
