//////////////////////////////////////////////
/////////---GLOBALS---///////////////////////
////////////////////////////////////////////

///////---USER FEEDBACK---///////

const handlePOSTError = (errorMessage) => {
  $('.modal').modal('hide');
  errorMessage
    ? $('#errorMessage').html(errorMessage)
    : $('#errorMessage').html('<p>Your request was unsuccesful, please try again.</p><p>If the problem persists please contact your administrator.</p>');
  $('#errorModal').modal('show');
}

//////////////////////////////////////////////
/////////---GET ALL---///////////////////////
////////////////////////////////////////////

///////---PERSONNEL---///////

$('#personnelBtn').on('click', () => {
  resetOnRefresh();
  $("#filterBtn").attr("disabled", false);
  displayAllPersonnel();
});

const displayAllPersonnel = async () => {
  const pers = await getAllPersonnel()
    .then((pers) => populatePersonnel(pers));
}

const getAllPersonnel = async () => {
  let personnel = [];
  await $.ajax({
    url: './libs/php/getAll.php',
    type: 'POST',
    dataType: 'json',
    success: (result) => {
      if (result.status.name == 'ok') {
        personnel = result.data;
      } else {
        handlePOSTError();
        return;
      }
    },
    error: () => {
      handlePOSTError();
      return;
    }
  });
  return personnel;
}

const populatePersonnel = (personnelArray) => {

  const frag = document.createDocumentFragment();

  const tableBody = document.createElement('tbody');
  tableBody.id = 'personnelTableBody';

  personnelArray.forEach((person) => {

    const row = document.createElement('tr');
                
    const name = document.createElement('td');
    name.classList = 'align-middle text-nowrap';
    const nameText = document.createTextNode(`${person.lastName}, ${person.firstName}`);
    name.append(nameText);
    row.append(name);

    const departmentName = document.createElement('td');
    departmentName.classList = 'align-middle text-nowrap d-none d-md-table-cell';
    const departmentNameText = document.createTextNode(person.departmentName);
    departmentName.append(departmentNameText);
    row.append(departmentName);

    const jobTitle = document.createElement('td');
    jobTitle.classList = 'align-middle text-nowrap d-none d-md-table-cell';
    const jobTitleText = document.createTextNode(person.jobTitle);
    jobTitle.append(jobTitleText);
    row.append(jobTitle);

    const locationName = document.createElement('td');
    locationName.classList = 'align-middle text-nowrap d-none d-md-table-cell';
    const locationNameText = document.createTextNode(person.locationName);
    locationName.append(locationNameText);
    row.append(locationName);

    const email = document.createElement('td');
    email.classList = 'align-middle text-nowrap d-none d-md-table-cell';
    const emailText = document.createTextNode(person.email);
    email.append(emailText);
    row.append(email);
    
    const controls = document.createElement('td');
    controls.classList = 'text-end text-nowrap';

    const editBtn = document.createElement('button');
    editBtn.classList = 'btn btn-primary btn-sm mx-1';
    editBtn.setAttribute('type', 'button');
    editBtn.setAttribute('data-bs-toggle', 'modal');
    editBtn.setAttribute('data-bs-target', '#editPersonnelModal');
    editBtn.setAttribute('data-id', person.id);

    const editBtnIcon = document.createElement('i');
    editBtnIcon.classList = 'fa-solid fa-pencil fa-fw';
    editBtn.append(editBtnIcon);

    controls.append(editBtn);
    
    const deleteBtn = document.createElement('button');
    deleteBtn.classList = 'btn btn-primary btn-sm deleteButton';
    deleteBtn.setAttribute('type', 'button');
    deleteBtn.setAttribute('data-id', person.id);

    const deleteBtnIcon = document.createElement('i');
    deleteBtnIcon.classList = 'fa-solid fa-trash fa-fw';
    deleteBtn.append(deleteBtnIcon);

    controls.append(deleteBtn);
    row.append(controls);

    tableBody.append(row);
  });

  frag.append(tableBody);
  $('#personnelTableBody').replaceWith(frag);
}

///////---DEPARTMENTS---///////

$('#departmentsBtn').on('click', () => {
  resetOnRefresh();
  $("#filterBtn").attr("disabled", true);
  displayAllDepartments();
});

const displayAllDepartments = async () => {
  const deps = await getAllDepartments()
    .then((deps) => populateDepartments(deps));
}

const getAllDepartments = async () => {
  let departments = [];
  await $.ajax({
    url: './libs/php/getAllDepartments.php',
    type: 'POST',
    dataType: 'json',
    success: (result) => {
      if (result.status.name == 'ok') {
        departments = result.data;
      } else {
        handlePOSTError();
        return;
      }
    },
    error: () => {
      handlePOSTError();
      return;
    }
  });
  return departments;
}

const populateDepartments = (departmentsArray) => {
  const frag = document.createDocumentFragment();

  const tableBody = document.createElement('tbody');
  tableBody.id = 'departmentTableBody';

  departmentsArray.forEach((dep) => {

    const row = document.createElement('tr');
                
    const name = document.createElement('td');
    name.classList = 'align-middle text-nowrap';
    const nameText = document.createTextNode(dep.departmentName);
    name.append(nameText);
    row.append(name);

    const location = document.createElement('td');
    location.classList = 'align-middle text-nowrap d-none d-md-table-cell';
    const locationText = document.createTextNode(dep.locationName);
    location.append(locationText);
    row.append(location);

    const controls = document.createElement('td');
    controls.classList = 'text-end text-nowrap';

    const editBtn = document.createElement('button');
    editBtn.setAttribute('type', 'button');
    editBtn.classList = 'btn btn-primary btn-sm mx-1';
    editBtn.setAttribute('data-bs-toggle', 'modal');
    editBtn.setAttribute('data-bs-target', '#editDepartmentModal');
    editBtn.setAttribute('data-id', dep.id);
    
    const editBtnIcon = document.createElement('i');
    editBtnIcon.classList = 'fa-solid fa-pencil fa-fw';
    editBtn.append(editBtnIcon);
    
    controls.append(editBtn);

    const deleteBtn = document.createElement('button');
    deleteBtn.setAttribute('type', 'button');
    deleteBtn.classList = 'btn btn-primary btn-sm deleteButton';
    deleteBtn.setAttribute('data-id', dep.id);
    
    const deleteBtnIcon = document.createElement('i');
    deleteBtnIcon.classList = 'fa-solid fa-trash fa-fw';
    deleteBtn.append(deleteBtnIcon);
    
    controls.append(deleteBtn);
    
    row.append(controls);

    tableBody.append(row);
  });

  frag.append(tableBody);
  $('#departmentTableBody').replaceWith(frag);
}

///////---LOCATIONS---///////

$('#locationsBtn').on('click', () => {
  resetOnRefresh();
  $("#filterBtn").attr("disabled", true);
  displayAllLocations();
});

const displayAllLocations = async () => {
  const locs = await getAllLocations()
    .then((locs) => populateLocations(locs));
}

const getAllLocations = async () => {
  let locations = [];
  await $.ajax({
    url: './libs/php/getAllLocations.php',
    type: 'POST',
    dataType: 'json',
    success: (result) => {
      if (result.status.name == 'ok') {
        locations = result.data;
      } else {
        handlePOSTError();
        return;
      }
    },
    error: () => {
      handlePOSTError();
      return;
    }
  })
  return locations;
}

const populateLocations = (locationsArray) => {
  const frag = document.createDocumentFragment();

  const tableBody = document.createElement('tbody');
  tableBody.id = 'locationTableBody';

  locationsArray.forEach((loc) => {

    const row = document.createElement('tr');
                
    const name = document.createElement('td');
    name.classList = 'align-middle text-nowrap';
    const nameText = document.createTextNode(loc.locationName);
    name.append(nameText);
    row.append(name);

    const controls = document.createElement('td');
    controls.classList = 'text-end text-nowrap';

    const editBtn = document.createElement('button');
    editBtn.setAttribute('type', 'button');
    editBtn.classList = 'btn btn-primary btn-sm mx-1';
    editBtn.setAttribute('data-bs-toggle', 'modal');
    editBtn.setAttribute('data-bs-target', '#editLocationModal');
    editBtn.setAttribute('data-id', loc.id);
    
    const editBtnIcon = document.createElement('i');
    editBtnIcon.classList = 'fa-solid fa-pencil fa-fw';
    editBtn.append(editBtnIcon);
    
    controls.append(editBtn);

    const deleteBtn = document.createElement('button');
    deleteBtn.setAttribute('type', 'button');
    deleteBtn.classList = 'btn btn-primary btn-sm deleteButton';
    deleteBtn.setAttribute('data-id', loc.id);
    
    const deleteBtnIcon = document.createElement('i');
    deleteBtnIcon.classList = 'fa-solid fa-trash fa-fw';
    deleteBtn.append(deleteBtnIcon);
    
    controls.append(deleteBtn);
    
    row.append(controls);

    tableBody.append(row);
  });

  frag.append(tableBody);
  $('#locationTableBody').replaceWith(frag);
}


//////////////////////////////////////////////////////////
/////////---REFRESH---///////////////////////////////////
////////////////////////////////////////////////////////

$('#refreshBtn').on('click', () => {
  refresh();
});

//resets certain values on refresh
const resetOnRefresh = () => {
  //reset search input text
  $('#searchInp').val('');
  //reset memory in filter select boxes
  resetSelectMemory();
}

const refresh = () => {
  if ($('#personnelBtn').hasClass('active')) {
    resetOnRefresh();
    displayAllPersonnel();
  } else if ($('#departmentsBtn').hasClass('active')) {
    resetOnRefresh();
    displayAllDepartments();
  } else {
    resetOnRefresh();
    displayAllLocations();
  }
}


//////////////////////////////////////////////////////////
/////////---FILTER---////////////////////////////////////
////////////////////////////////////////////////////////

//Populate selects on modal open
$('#filterModal').on('show.bs.modal', async () => {
  const savedDepVal = $('#filterByDepartmentSelectMemory').val();
  const savedLocVal = $('#filterByLocationSelectMemory').val();
  await populateDepartmentsSelect('#filterByDepartmentSelectInput')
    .then(() => {
      if ($(`#filterByDepartmentSelectInput option[value=${savedDepVal}]`).length != 0) {
        $('#filterByDepartmentSelectInput').val(savedDepVal);
      } else {
        $('#filterByDepartmentSelectInput').val('all');
        displayAllPersonnel();
      }
    });
  await populateLocationsSelect('#filterByLocationSelectInput')
    .then(() => {
      if ($(`#filterByLocationSelectInput option[value=${savedLocVal}]`).length != 0) {
        $('#filterByLocationSelectInput').val(savedLocVal);
      } else {
        $('#filterByLocationSelectInput').val('all');
        displayAllPersonnel();
      }
    });
});

$('#filterModal').on('hide.bs.modal', () => {
  $('#filterByDepartmentSelectMemory').val($('#filterByDepartmentSelectInput').val());
  $('#filterByLocationSelectMemory').val($('#filterByLocationSelectInput').val());
  
});

$('#filterByDepartmentSelectInput').on('change', () => {
  if ($('#filterByLocationSelectInput').val() !== 'all') {
    $('#filterByLocationSelectInput').val('all');
  }
  if ($('#filterByDepartmentSelectInput').val() === 'all' && $('#filterByLocationSelectInput').val() === 'all') {
    displayAllPersonnel();
  } else {
    submitFilter($('#filterByDepartmentSelectInput').val(), 'department');
  }
});

$('#filterByLocationSelectInput').on('change', () => {
  if ($('#filterByDepartmentSelectInput').val() !== 'all') {
    $('#filterByDepartmentSelectInput').val('all');
  }
  if ($('#filterByDepartmentSelectInput').val() === 'all' && $('#filterByLocationSelectInput').val() === 'all') {
    displayAllPersonnel();
  } else {
    submitFilter($('#filterByLocationSelectInput').val(), 'location');
  }
});

submitFilter = (query, filterBy) => {
  $.ajax({
    url: './libs/php/filter.php',
    type: 'POST',
    data: {
      id: query,
      filterBy: filterBy
    },
    dataType: 'json',
    success: (result) => {
      if (result.status.name == 'ok') {
        const personnelFound = result.data.found;
        if (personnelFound.length > 0) {
          populatePersonnel(personnelFound);
        } else {
          $('#personnelTableBody').replaceWith(noFilterResultsStr('personnelTableBody'));
        }
      } else {
        handlePOSTError();
      }
    },
    error: () => {
      handlePOSTError();
    }
  });
}

///////---FILTER UTILITIES---///////
//Reset Selects then add all option to filters
prepSelect = (targetElem) => {
  $(targetElem).empty();
  if (targetElem === '#filterByDepartmentSelectInput' || targetElem === '#filterByLocationSelectInput') {
    $(targetElem).append(`<option value="all">All</option>`);
  }
}

//Populate Select inputs for departments
const populateDepartmentsSelect = async (targetElem) => {
  prepSelect(targetElem);
  const departmentsArray = await getAllDepartments()
    .then((departmentsArray) => {
      departmentsArray.forEach((dep) => {
        $(targetElem).append(
          `<option value="${dep.id}">${dep.departmentName}</option>`
        );
      });
    });
}

//Populate Select inputs for locations
const populateLocationsSelect = async (targetElem) => {
  prepSelect(targetElem);
  const locationsArray = await getAllLocations()
    .then((locationsArray) => {
      locationsArray.forEach((loc) => {
        $(targetElem).append(
          `<option value="${loc.id}">${loc.locationName}</option>`
        );
      });
    });
}

//Message to display when filter returns no results
const noFilterResultsStr = (elemID) => {
  return `<tbody id="${elemID}">
    <tr>
      <td class="align-middle text-nowrap">
        Filter returned no results...
      </td>
    </tr>
  </tbody>`
}

//Reset memory for selects
const resetSelectMemory = () => {
  $('#filterByDepartmentSelectMemory').val('all');
  $('#filterByLocationSelectMemory').val('all');
}

//////////////////////////////////////////////////////////
/////////---SEARCH---////////////////////////////////////
////////////////////////////////////////////////////////

$('#searchInp').on('keyup', () => {
  if ($('#personnelBtn').hasClass('active')) {
    searchAll($('#searchInp').val());
    resetSelectMemory();
  } else if ($('#departmentsBtn').hasClass('active')) {
    searchDepartment($('#searchInp').val());
    resetSelectMemory();
  } else {
    searchLocation($('#searchInp').val());
    resetSelectMemory();
  }
});

const searchAll = (query) => {
  $.ajax({
    url: './libs/php/searchAll.php',
    type: 'POST',
    data: {
      txt: query
    },
    dataType: 'json',
    success: (result) => {
      if (result.status.name == 'ok') {
        const personnelFound = result.data.found;
        if (personnelFound.length > 0) {
          populatePersonnel(personnelFound);
        } else {
          $('#personnelTableBody').replaceWith(noSearchResultsStr('personnelTableBody'));
        }
      } else {
        handlePOSTError();
      }
    },
    error: () => {
      handlePOSTError();
    }
  });
}

const searchDepartment = (query) => {
  $.ajax({
    url: './libs/php/searchDepartment.php',
    type: 'POST',
    data: {
      txt: query
    },
    dataType: 'json',
    success: (result) => {
      if (result.status.name == 'ok') {
        const depFound = result.data.found;
        if (depFound.length > 0) {
          populateDepartments(depFound);
        } else {
          $('#departmentTableBody').replaceWith(noSearchResultsStr('departmentTableBody'));
        }
      } else {
        handlePOSTError();
      }
    },
    error: () => {
      handlePOSTError();
    }
  });
}

const searchLocation = (query) => {
  $.ajax({
    url: './libs/php/searchLocation.php',
    type: 'POST',
    data: {
      txt: query
    },
    dataType: 'json',
    success: (result) => {
      if (result.status.name == 'ok') {
        const locFound = result.data.found;
        if (locFound.length > 0) {
          populateLocations(locFound);
        } else {
          $('#locationTableBody').replaceWith(noSearchResultsStr('locationTableBody'));
        }
      } else {
        handlePOSTError();
      }
    },
    error: () => {
      handlePOSTError();
    }
  })
}

///////---SEARCH UTILITIES---///////
//Message to display when search returns no results
const noSearchResultsStr = (elemID) => {
  return `<tbody id="${elemID}">
    <tr>
      <td class="align-middle text-nowrap">
        Search returned no results...
      </td>
    </tr>
  </tbody>`
}


//////////////////////////////////////////////////////////
/////////---EDIT---//////////////////////////////////////
////////////////////////////////////////////////////////

///////---PERSONNEL---///////

$('#editPersonnelModal').on('show.bs.modal', (e) => {
  editPersonnel(e);
});

$('#editPersonnelModal').on('hidden.bs.modal', (e) => {
  $('#modalTitleEditPersonnel').html('Edit Employee');
});

const editPersonnel = (e) => {
  $.ajax({
    url:
      './libs/php/getPersonnelByID.php',
    type: 'POST',
    dataType: 'json',
    data: {
      id: $(e.relatedTarget).attr('data-id')
    },
    success: (result) => {
      const resultCode = result.status.code;

      if (resultCode == 200) {

        $('#editPersonnelEmployeeID').val(result.data.personnel[0].id);
        $('#editPersonnelFirstName').val(result.data.personnel[0].firstName);
        $('#editPersonnelLastName').val(result.data.personnel[0].lastName);
        $('#editPersonnelJobTitle').val(result.data.personnel[0].jobTitle);
        $('#editPersonnelEmailAddress').val(result.data.personnel[0].email);

        $('#editPersonnelDepartment').html('');
        result.data.department.forEach((dep) => {
          $('#editPersonnelDepartment').append(
            `<option value="${dep.id}">${dep.name}</option>`
          );
        });
        $('#editPersonnelDepartment').val(result.data.personnel[0].departmentID);
      } else {
        handlePOSTError();
      }
    },
    error: (jqXHR, textStatus, errorThrown) => {
      handlePOSTError();
    }
  });
}

$('#editPersonnelForm').on('submit', (e) => {
  e.preventDefault();
  editPersonnelSubmit();
});

const editPersonnelSubmit = () => {
  const targetID = $('#editPersonnelEmployeeID').val();
  $.ajax({
    url:
      './libs/php/editPersonnelByID.php',
    type: 'POST',
    dataType: 'json',
    data: {
      id: targetID,
      firstName: $('#editPersonnelFirstName').val(),
      lastName: $('#editPersonnelLastName').val(),
      jobTitle: $('#editPersonnelJobTitle').val(),
      email: $('#editPersonnelEmailAddress').val(),
      departmentID: $('#editPersonnelDepartment').val()
    },
    success: (result) => {
      const resultCode = result.status.code;
      if (resultCode == 200) {
        $('#modalTitleEditPersonnel').html('<i class="fa-solid fa-check"></i>&ensp;Employee updated');
        refresh();
      } else {
        handlePOSTError();
      }
    },
    error: (jqXHR, textStatus, errorThrown) => {
      handlePOSTError();
    }
  });
}


///////---DEPARTMENT---///////

$('#editDepartmentModal').on('show.bs.modal', (e) => {
  editDepartment(e);
});

$('#editDepartmentModal').on('hidden.bs.modal', (e) => {
  $('#modalTitleEditDepartment').html('Edit Department');
});

const editDepartment = (e) => {
  $.ajax({
    url:
      './libs/php/getDepartmentByID.php',
    type: 'POST',
    dataType: 'json',
    data: {
      id: $(e.relatedTarget).attr('data-id')
    },
    success: async (result) => {
      const resultCode = result.status.code;

      if (resultCode == 200) {
        $('#editDepartmentID').val(result.data[0].id);
        $('#editDepartmentName').val(result.data[0].departmentName);
        await populateLocationsSelect('#editDepartmentLocation')
          .then(() => $('#editDepartmentLocation').val(result.data[0].locationID));
      } else {
        handlePOSTError();
        }
    },
    error: (jqXHR, textStatus, errorThrown) => {
      handlePOSTError();
    }
  });
}

$('#editDepartmentForm').on('submit', (e) => {
  e.preventDefault();
  editDepartmentSubmit();
});

const editDepartmentSubmit = () => {
  const targetID = $('#editDepartmentID').val();
  $.ajax({
    url:
      './libs/php/editDepartmentByID.php',
    type: 'POST',
    dataType: 'json',
    data: {
      id: targetID,
      departmentName: $('#editDepartmentName').val(),
      locationID: $('#editDepartmentLocation').val()
    },
    success: (result) => {
      const resultCode = result.status.code;
      if (resultCode == 200) {
        $('#modalTitleEditDepartment').html('<i class="fa-solid fa-check"></i>&ensp;Department updated');
        refresh();
      } else {
        handlePOSTError();
      }
    },
    error: (jqXHR, textStatus, errorThrown) => {
      handlePOSTError();
    }
  });
}


///////---LOCATION---///////

$('#editLocationModal').on('show.bs.modal', (e) => {
  editLocation(e);
});

$('#editLocationModal').on('hidden.bs.modal', (e) => {
  $('#modalTitleEditLocation').html('Edit Location');
});

const editLocation = (e) => {
  $.ajax({
    url:
      './libs/php/getLocationByID.php',
    type: 'POST',
    dataType: 'json',
    data: {
      id: $(e.relatedTarget).attr('data-id')
    },
    success: async (result) => {
      const resultCode = result.status.code;

      if (resultCode == 200) {

        $('#editLocationID').val(result.data[0].id);
        $('#editLocationName').val(result.data[0].locationName);
      } else {
        handlePOSTError();
        }
    },
    error: (jqXHR, textStatus, errorThrown) => {
      handlePOSTError();
    }
  });
}

$('#editLocationForm').on('submit', (e) => {
  e.preventDefault();
  editLocationSubmit();
});

const editLocationSubmit = () => {
  const targetID = $('#editLocationID').val();
  $.ajax({
    url:
      './libs/php/editLocationByID.php',
    type: 'POST',
    dataType: 'json',
    data: {
      id: targetID,
      locationName: $('#editLocationName').val()
    },
    success: (result) => {
      const resultCode = result.status.code;
      if (resultCode == 200) {
        $('#modalTitleEditLocation').html('<i class="fa-solid fa-check"></i>&ensp;Location updated');
        refresh();
      } else {
        handlePOSTError();
      }
    },
    error: (jqXHR, textStatus, errorThrown) => {
      handlePOSTError();
    }
  });
}


//////////////////////////////////////////////////////////
/////////---ADD---///////////////////////////////////////
////////////////////////////////////////////////////////

$('#addBtn').on('click', () => {
  if ($('#personnelBtn').hasClass('active')) {
    populateDepartmentsSelect('#addPersonnelDepartment')
    $('#addPersonnelModal').modal('show');
  } else if ($('#departmentsBtn').hasClass('active')) {
    populateLocationsSelect('#addDepartmentLocation')
    $('#addDepartmentModal').modal('show');
  } else {
    $('#addLocationModal').modal('show');
  }
});

$('.addModal').on('hidden.bs.modal', () => {
  $('.addFormItem').val('');
})

///////---PERSONNEL---///////

$('#addPersonnelForm').on('submit', (e) => {
  e.preventDefault();
  addPersonnelSubmit();
});

$('#addPersonnelModal').on('hidden.bs.modal', () => {
  $('#modalTitleAddPersonnel').html('Add Personnel');
})

const addPersonnelSubmit = () => {
  $.ajax({
    url:
      './libs/php/insertPersonnel.php',
    type: 'POST',
    dataType: 'json',
    data: {
      firstName: $('#addPersonnelFirstName').val(),
      lastName: $('#addPersonnelLastName').val(),
      jobTitle: $('#addPersonnelJobTitle').val(),
      emailAddress: $('#addPersonnelEmailAddress').val(),
      departmentID: $('#addPersonnelDepartment').val()
    },
    success: (result) => {
      const resultCode = result.status.code;
      if (resultCode == 200) {
        $('#modalTitleAddPersonnel').html('<i class="fa-solid fa-check"></i>&ensp;Employee added');
        $('.addFormItem').val('');
        refresh();
      } else {
        handlePOSTError();
      }
    },
    error: (jqXHR, textStatus, errorThrown) => {
      handlePOSTError();
    }
  });
}


///////---DEPARTMENT---///////

$('#addDepartmentForm').on('submit', (e) => {
  e.preventDefault();
  addDepartmentSubmit();
});

$('#addDepartmentModal').on('hidden.bs.modal', () => {
  $('#modalTitleAddDepartment').html('Add Department');
})

const addDepartmentSubmit = () => {
  $.ajax({
    url:
      './libs/php/insertDepartment.php',
    type: 'POST',
    dataType: 'json',
    data: {
      name: $('#addDepartmentName').val(),
      locationID: $('#addDepartmentLocation').val(),
    },
    success: (result) => {
      const resultCode = result.status.code;
      if (resultCode == 200) {
        $('#modalTitleAddDepartment').html('<i class="fa-solid fa-check"></i>&ensp;Department added');
        $('.addFormItem').val('');
        refresh();
      } else {
        handlePOSTError();
      }
    },
    error: (jqXHR, textStatus, errorThrown) => {
      handlePOSTError();
    }
  });
}

///////---LOCATION---///////

$('#addLocationForm').on('submit', (e) => {
  e.preventDefault();
  addLocationSubmit();
});

$('#addLocationModal').on('hidden.bs.modal', () => {
  $('#modalTitleAddLocation').html('Add Location');
})

const addLocationSubmit = () => {
  $.ajax({
    url:
      './libs/php/insertLocation.php',
    type: 'POST',
    dataType: 'json',
    data: {
      name: $('#addLocationName').val(),
    },
    success: (result) => {
      const resultCode = result.status.code;
      if (resultCode == 200) {
        $('#modalTitleAddLocation').html('<i class="fa-solid fa-check"></i>&ensp;Location added');
        $('.addFormItem').val('');
        refresh();
      } else {
        handlePOSTError();
      }
    },
    error: (jqXHR, textStatus, errorThrown) => {
      handlePOSTError();
    }
  });
}


//////////////////////////////////////////////////////////
/////////---DELETE---////////////////////////////////////
////////////////////////////////////////////////////////


$('body').on('click', '.deleteButton' , async (e) => {
  const targetID = $(e.currentTarget).attr('data-id');
  $('#deleteTargetID').val(targetID);
  if ($('#personnelBtn').hasClass('active')) {
    $('#deleteModal').modal('show');
  } else if ($('#departmentsBtn').hasClass('active')) {
    const dependancyCount = await dependancyCheckDepartment(targetID)
      .then((dependancyCount) => {
        if (dependancyCount > 0) {
          $('#dependancyCount').val(dependancyCount);
          $('#dependancyModal').modal('show');
        } else {
          $('#deleteModal').modal('show');
        }
      });
  } else {
    const dependancyCount = await dependancyCheckLocation(targetID)
      .then((dependancyCount) => {
        if (dependancyCount > 0) {
          $('#dependancyCount').val(dependancyCount);
          $('#dependancyModal').modal('show');
        } else {
          $('#deleteModal').modal('show');
        }
      });
  }
});


$('#deleteModal').on('show.bs.modal', async () => {
  if ($('#personnelBtn').hasClass('active')) {
    const targetName = await getPersonnelName($('#deleteTargetID').val())
      .then((targetName) => $('#deleteTargetName').html(targetName));
  } else if ($('#departmentsBtn').hasClass('active')) {
    const targetName = await getDepartmentName($('#deleteTargetID').val())
      .then((targetName) => $('#deleteTargetName').html(targetName));
  } else {
    const targetName = await getLocationName($('#deleteTargetID').val())
      .then((targetName) => $('#deleteTargetName').html(targetName));
  }
});


$('#dependancyModal').on('show.bs.modal', async () => {
  $('#deleteTargetNumRecords').html($('#dependancyCount').val());
  if ($('#personnelBtn').hasClass('active')) {
    const targetName = await getPersonnelName($('#deleteTargetID').val())
      .then((targetName) => $('#deleteFailedTargetName').html(targetName));
  } else if ($('#departmentsBtn').hasClass('active')) {
    const targetName = await getDepartmentName($('#deleteTargetID').val())
      .then((targetName) => $('#deleteFailedTargetName').html(targetName));
  } else {
    const targetName = await getLocationName($('#deleteTargetID').val())
      .then((targetName) => $('#deleteFailedTargetName').html(targetName));
  }
});


$('#deleteModal').on('hidden.bs.modal', () => {
  $('#deleteTargetID').val('');
  $('#deleteTargetName').html('');
});

$('#dependancyModal').on('hidden.bs.modal', () => {
  $('#deleteTargetID').val('');
  $('#deleteFailedTargetName').html('');
  $('#deleteTargetNumRecords').html('');
});

$('#confirmDeleteButton').on('click', () => {
  const targetID = $('#deleteTargetID').val();
  if ($('#personnelBtn').hasClass('active')) {
    deletePersonnelById(targetID);
  } else if ($('#departmentsBtn').hasClass('active')) {
      deleteDepartmentById(targetID);
  } else {
      deleteLocationById(targetID);
  }
});

///////---PERSONNEL---///////

const deletePersonnelById = (query) => {
  $.ajax({
    url: './libs/php/deletePersonnelByID.php',
    type: 'POST',
    data: {
      id: query
    },
    dataType: 'json',
    success: (result) => {
      if (result.status.name == 'ok') {
        refresh();
      } else {
        handlePOSTError();
      }
    },
    error: () => {
      handlePOSTError();
    }
  });
}

///////---DEPARTMENT---///////

const deleteDepartmentById = (query) => {
  $.ajax({
    url: './libs/php/deleteDepartmentByID.php',
    type: 'POST',
    data: {
      id: query
    },
    dataType: 'json',
    success: (result) => {
      if (result.status.name == 'ok') {
        refresh();
      } else {
        handlePOSTError();
      }
    },
    error: () => {
      handlePOSTError();
    }
  });
}

///////---LOCATION---///////

const deleteLocationById = (query) => {
  $.ajax({
    url: './libs/php/deleteLocationByID.php',
    type: 'POST',
    data: {
      id: query
    },
    dataType: 'json',
    success: (result) => {
      if (result.status.name == 'ok') {
        refresh();
      } else {
        handlePOSTError();
      }
    },
    error: () => {
      handlePOSTError();
    }
  });
}

///////---DELETE UTILITIES---///////
//Checks if a department has dependencies
const dependancyCheckDepartment = async (query) => {
  let dependancyCount;
  await $.ajax({
    url: './libs/php/dependancyCheckDepartment.php',
    type: 'POST',
    data: {
      departmentID: query
    },
    dataType: 'json',
    success: (result) => {
      if (result.status.name == 'ok') {
        dependancyCount = result.data[0].count;
      } else {
        handlePOSTError();
        return;
      }
    },
    error: () => {
      handlePOSTError();
      return;
    }
  });
  return dependancyCount;
}

//Checks if a location has dependencies
const dependancyCheckLocation = async (query) => {
  let dependancyCount;
  await $.ajax({
    url: './libs/php/dependancyCheckLocation.php',
    type: 'POST',
    data: {
      locationID: query
    },
    dataType: 'json',
    success: (result) => {
      if (result.status.name == 'ok') {
        dependancyCount = result.data[0].count;
      } else {
        handlePOSTError();
        return;
      }
    },
    error: () => {
      handlePOSTError();
      return;
    }
  });
  return dependancyCount;
}

//Gets name for dialogue boxes
const getPersonnelName = async (id) => {
  let targetName;
  await $.ajax({
    url:
      './libs/php/getPersonnelByID.php',
    type: 'POST',
    dataType: 'json',
    data: {
      id: id
    },
    success: (result) => {
      const resultCode = result.status.code;
      if (resultCode == 200) {
        const { firstName, lastName } = result.data.personnel[0];
        targetName = `${firstName} ${lastName}`;
      } else {
        handlePOSTError();
      }
    },
    error: (jqXHR, textStatus, errorThrown) => {
      handlePOSTError();
    }
  });
  return targetName;
}

const getDepartmentName = async (id) => {
  let targetName;
  await $.ajax({
    url:
      './libs/php/getDepartmentByID.php',
    type: 'POST',
    dataType: 'json',
    data: {
      id: id
    },
    success: (result) => {
      const resultCode = result.status.code;
      if (resultCode == 200) {
        targetName = result.data[0].departmentName;
      } else {
        handlePOSTError();
      }
    },
    error: (jqXHR, textStatus, errorThrown) => {
      handlePOSTError();
    }
  });
  return targetName;
}

const getLocationName = async (id) => {
  let targetName;
  await $.ajax({
    url:
      './libs/php/getLocationByID.php',
    type: 'POST',
    dataType: 'json',
    data: {
      id: id
    },
    success: (result) => {
      const resultCode = result.status.code;
      if (resultCode == 200) {
        targetName = result.data[0].locationName;
      } else {
        handlePOSTError();
      }
    },
    error: (jqXHR, textStatus, errorThrown) => {
      handlePOSTError();
    }
  });
  return targetName;
}


//////////////////////////////////////////////////////////
/////////---ON DOM LOAD---///////////////////////////////
////////////////////////////////////////////////////////

$(() => {
  displayAllPersonnel();
});
