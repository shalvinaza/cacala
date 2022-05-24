var careers = careers || {};

careers.shared = function ($) {

  'use strict';

  var locations = ['Brooklyn, NY', 'Detroit, MI', 'Oakland, CA', 'Washington, DC', 'London, UK'];
  var departments = ['Creative', 'Human Resources', 'Technology', 'Operations', 'UX & Product Design'];

  function slugify(text) {
    return text.toString().toLowerCase()
    // .replace(/,\s*/g, '.')
    .replace(/\s+/g, '-').replace(/[^\w\-]+/g, '').replace(/\-\-+/g, '-').replace(/^-+/, '').replace(/-+$/, '');
  }

  function slugifyLocation(text) {
    return text.toString().replace(', ', '.').replace(' ', '-');
  }

  function slugifyDepartment(text) {
    return text.toString().replace(' ', '+').replace('-', '_');
  }

  return {
    locations: locations,
    departments: departments,
    slugifyLocation: slugifyLocation,
    slugifyDepartment: slugifyDepartment,
    slugify: slugify
  };

}(jQuery);


var careers = careers || {};

String.prototype.includes = String.prototype.includes || function(str) {
  return this.indexOf(str) >= 0;
};

String.prototype.startsWith = String.prototype.startsWith || function(prefix) {
  return this.indexOf(prefix) === 0;
};

String.prototype.endsWith = String.prototype.endsWith || function(suffix) {
  return this.indexOf(suffix, this.length - suffix.length) >= 0;
};

careers.search = function($) {

  'use strict';

  var HASH_BANG = "#!/";
  var FILTER_DELIMITER = ':';
  var BASE_TALEO_APPLY_URL = 'https://chm.tbe.taleo.net/chm01/ats/careers/apply.jsp?org=CARDFINA&cws=1&rid=';
  var isApplication = false;

  var vm = new Vue({
    el: '#careersVue',
    data: {
      locations: careers.shared.locations,
      departments: careers.shared.departments,
      jobs: data,
      checkedLocations: [],
      checkedDepartments: [],
      selectedJob: null,
      showApplication: false
    },
    mounted: function() {
      // this.fetchData();
    },
    created: function() {
      $('#careersVue').show();
      this.applyFilters();
    },
    methods: {
      fetchData: function fetchData() {
        // AJAX Call to get reqs
      },
      updateLocationUrl: function updateLocationUrl(location) {
        _updateUrlHash('location', location);
      },
      updateDepartmentUrl: function updateDepartmentUrl(department) {
        _updateUrlHash('department', department);
      },
      applyFilters: function applyFilters() {

        var vm = this;

        $('html,body').scrollTop(0);

        if (!_hasHash()) {
          vm.selectedJob = null;
          vm.checkedLocations = [];
          vm.checkedDepartments = [];
          _removeTaleoIframe();
          _setPageTitle();

        } else {



          var hashValue = _getHashValue();

          isApplication = hashValue.endsWith('/apply');

          if (isApplication === false) {
            vm.showApplication = false;
            _removeTaleoIframe();

            var reqId = parseInt(hashValue.split(FILTER_DELIMITER)[0]);
            if (Number.isInteger(reqId)) {
              this.setSelectedJob(reqId);
              this.setPageTitle(vm.selectedJob.title);
            } else {
              this.setPageTitle();
            }

          } else {
            var reqId2 = parseInt(hashValue.split(FILTER_DELIMITER)[0]);

            if (Number.isInteger(reqId2)) {
              vm.showApplication = true;
              this.setSelectedJob(reqId2);
              this.setPageTitle(vm.selectedJob.title + '- Job Application');
              setTimeout(function() {
                _removeTaleoIframe();
                $('<iframe src=' + BASE_TALEO_APPLY_URL + reqId2 + ' frameborder="0" width="100%" height="4000" id="taleoApplyFrame"></iframe>').appendTo('.frameContainer');
              }, 1);
            }

          }


          // single job item
          var requisitionId = parseInt(hashValue.split(FILTER_DELIMITER)[0]);

          if (!Number.isInteger(requisitionId)) {
            vm.selectedJob = null;
          }


          // multiple filters are seperated with an ampersand
          // so if the hash contains an ampersand there are
          // multiple filters
          if (hashValue.includes('&')) {
            // split on the &
            var filters = hashValue.split('&'); // department=x,y,z  location=a,b,c

            for (var i = 0; i < filters.length; i++) {
              if (filters[i].includes('location')) {

                var locations = filters[i].split('=')[1].split(FILTER_DELIMITER).map(function(l) {
                  return _unSlugifyLocation(l);
                });

                _selectOption('location', locations[0]);


                vm.checkedLocations = locations;
              }

              if (filters[i].includes('department')) {
                var departments = filters[i].split('=')[1].split(FILTER_DELIMITER).map(function(l) {
                  return _unSlugifyDepartment(l);
                });

                _selectOption('department', departments[0]);

                vm.checkedDepartments = departments;
              }
            }
          } else {
            // no ampersand

            // we know there is only one filter, so we need to
            // check if it is a location filter or a department filter
            if (hashValue.includes('location')) {
              // next we need to split this filter in to it key/value segments
              var locationArray = hashValue.split('='),
                key = locationArray[0],
                value = locationArray[1],
                values = value.split(FILTER_DELIMITER);

              var location = values.map(function(l) {
                return _unSlugifyLocation(l);
              });

              _selectOption('location', location);

              vm.checkedLocations = location;
            }

            // we know there is only one filter, so we need to
            // check if it is a location filter or a department filter
            if (hashValue.includes('department')) {

              // next we need to split this filter in to it key/value segments
              var departmentArray = hashValue.split('='),
                key2 = departmentArray[0],
                value2 = departmentArray[1],
                values2 = value2.split(FILTER_DELIMITER);



              var department = values2.map(function(d) {
                return _unSlugifyDepartment(d);
              });

              _selectOption('department', department);

              vm.checkedDepartments = department;


            }
          }
        }


      },
      viewJob: function(job, event) {
        event.preventDefault();
        window.location.hash = HASH_BANG + job.id + FILTER_DELIMITER + careers.shared.slugify(job.location) + FILTER_DELIMITER + careers.shared.slugify(job.title);
        this.selectedJob = job;

        _removeTaleoIframe();

        $('<iframe src=' + BASE_TALEO_APPLY_URL + careers.search.vm.selectedJob.id + ' frameborder="0" width="100%" height="4000" id="taleoApplyFrame"></iframe>').appendTo('.jobApplication');
      },
      viewAppplication: function(event) {
        event.preventDefault();
        this.showApplication = true;

        setTimeout(function() {
          var iframe = $(".jobApplication").html();
          $(iframe).appendTo(".frameContainer");
        }, 5);

        window.location.hash = HASH_BANG + _getHashValue() + '/apply';

        //
      },
      clearDepartments: function(event) {
        event.preventDefault();
        this.checkedDepartments = [];

        var hashValue = _getHashValue();

        if (hashValue.includes('&')) {
          var filters = hashValue.split('&');

          if (filters[0].includes('department')) {
            window.location.hash = HASH_BANG + filters[1];
          } else {
            window.location.hash = HASH_BANG + filters[0];
          }
        } else {
          _removeHash();
        }
      },
      clearLocations: function(event) {
        event.preventDefault();
        this.checkedLocations = [];

        var hashValue = _getHashValue();

        if (hashValue.includes('&')) {
          var filters = hashValue.split('&');

          if (filters[0].includes('location')) {
            window.location.hash = HASH_BANG + filters[1];
          } else {
            window.location.hash = HASH_BANG + filters[0];
          }
        } else {
          _removeHash();
          this.applyFilters();
        }
      },
      toggleFilter: function(id, event) {
        $('i', $(event.currentTarget)).toggleClass('fa-minus fa-plus');
        var filterBody = document.getElementById(id);
        if (filterBody.style.display === 'none') {
          filterBody.style.display = 'block';
        } else {
          filterBody.style.display = 'none';
        }
      },
      updateMobileHash: function(event) {
        var value = event.target.value,
          filterType = event.target.name; // gets the name attr of the dropdown that
        vm = this;

        var hashValue = _getHashValue(),
          slug = '';

        if (hashValue !== '') {

          if (hashValue.includes('&')) {
            var filters = hashValue.split('&');
            if (filters[0].includes(filterType) && value === '') {
              careers.search.vm.checkedLocations = [];
              window.location.hash = HASH_BANG + filters[1];
            } else {
              if (filterType === 'department') {
                careers.search.vm.checkedDepartments = [];
              } else {
                careers.search.vm.checkedLocations = [];
              }
              window.location.hash = HASH_BANG + filters[0];
            }
          } else {
            if (hashValue.includes(filterType)) {
              // changing the value of an a filter
              if (filterType === 'location') {
                if (value === '') {
                  _removeHash();
                  careers.search.vm.checkedLocations = [];
                } else {
                  window.location.hash = HASH_BANG + 'location=' + careers.shared.slugifyLocation(value);
                }
              } else {
                if (value === '') {
                  _removeHash();
                  careers.search.vm.checkedDepartments = [];
                } else {
                  window.location.hash = HASH_BANG + 'department=' + careers.shared.slugifyDepartment(value);
                }
              }
            } else {
              // adding an aditional filterType
              if (hashValue.includes('department')) {
                slug = HASH_BANG + hashValue + '&location=' + careers.shared.slugifyLocation(value);
              } else {
                slug = HASH_BANG + hashValue + '&department=' + careers.shared.slugifyLocation(value);
              }
              window.location.hash = slug;
            }
          }
        } else {
          if (value === '') {
            if (filterType === 'location') {
              vm.checkedLocations = [];
            } else {
              vm.checkedDepartments = [];

            }

          } else {
            if (filterType === 'location') {
              window.location.hash = HASH_BANG + 'location=' + careers.shared.slugifyLocation(value);
            } else {
              window.location.hash = HASH_BANG + 'department=' + careers.shared.slugifyDepartment(value);
            }

          }
        }
      },
      backToAllJobs: function(event) {
        event.preventDefault();
        this.checkedDepartments = [];
        this.checkedLocations = [];
        this.selectedJob = null;
        this.showApplication = false;
        _removeHash();
        _removeTaleoIframe();
      },
      backToFilteredJobs: function(event) {

        event.preventDefault();
        _setPageTitle();
        this.selectedJob = null;
        this.showApplication = false;

        if (this.checkedDepartments.length > 0) {
          window.location.hash = HASH_BANG + 'department=' + _slugifyDepartments().join(FILTER_DELIMITER);
        }

        if (this.checkedLocations.length > 0) {
          window.location.hash = HASH_BANG + 'location=' + _slugifyLocations().join(FILTER_DELIMITER);
        }

        if (this.checkedDepartments.length > 0 && this.checkedLocations.length > 0) {
          window.location.hash = HASH_BANG + 'department=' + _slugifyDepartments() + '&location=' + _slugifyLocations();
        }
      },
      backToJob: function(event) {
        event.preventDefault();
        _removeTaleoIframe();
        this.showApplication = false;
        window.location.hash = HASH_BANG + _getHashValue().replace('/apply', '');
      },
      setSelectedJob: function(reqId) {
        this.selectedJob = $.grep(this.jobs, function(req) {
          return req.id == reqId;
        })[0];
      },
      setPageTitle: function(title) {

        if (!title) {
          title = 'Job Search';
        }

        document.title = title;
      }
    },
    computed: {
      filteredJobs: function filteredJobs() {
        var _this = this;

        console.log('_this',_this);

        var filterjobs = _this.jobs;

        if (_this.checkedLocations.length > 0) {
          filterjobs = filterjobs.filter(function(l) {
            return _this.checkedLocations.includes(l.location);
          });
        }

        if (_this.checkedDepartments.length > 0) {
          filterjobs = filterjobs.filter(function(d) {
            return _this.checkedDepartments.includes(d.department);
          });
        }

        return filterjobs;
      }
    }
  });


  function _updateUrlHash(key, value) {

    // is there a hash value?
    if (_hasHash()) {
      // get the hash value
      var hashValue = _getHashValue();

      // does the hash contain an ampersand?
      var hasAmpersand = hashValue.includes('&');

      if (hasAmpersand) {
        // split on ampersand - there is location AND department in the hash
        var filters = hashValue.split('&'); // department=x,y,z  location=a,b,c

        // build the slug
        var slug = '';

        if (filters[0].includes('location')) {

          if (vm.checkedDepartments.length === 1 && vm.checkedDepartments[0] === '') {

            slug = 'location=' + _slugifyLocations().join(FILTER_DELIMITER);
            vm.checkedDepartments = [];
          } else {

            if (vm.checkedDepartments.length === 0) {
              slug = 'location=' + _slugifyLocations().join(FILTER_DELIMITER);
            } else {
              slug = 'location=' + _slugifyLocations().join(FILTER_DELIMITER) + '&department=' + _slugifyDepartments().join(FILTER_DELIMITER);
            }
          }
        } else {
          // filter is department

          if (vm.checkedLocations.length === 1 && vm.checkedLocations[0] === '') {
            slug = 'department=' + _slugifyLocations().join(FILTER_DELIMITER);
            vm.checkedLocations = [];
          } else {

            if (vm.checkedLocations.length === 0) {
              slug = 'department=' + _slugifyDepartments().join(FILTER_DELIMITER);
            } else {
              slug = 'department=' + _slugifyDepartments().join(FILTER_DELIMITER) + '&' + 'location=' + _slugifyLocations().join(FILTER_DELIMITER);
            }
          }
        }

        if (vm.checkedLocations.length === 0 || vm.checkedLocations.length === 1 && vm.checkedLocations.length[0] === '') {
          slug = slug.replace('location=&', '');
        }

        if (vm.checkedDepartments.length === 0 || vm.checkedDepartments.length === 1 && vm.checkedDepartments.length[0] === '') {
          slug = slug.replace('department=&', '');
        }

        window.location.hash = HASH_BANG + slug;
      } else {
        // doesnt have ampersand
        // split on equal
        var hashArray = hashValue.split('='),
          _key2 = hashArray[0];

        if (_key2 === 'location') {

          if (vm.checkedDepartments.length === 0) {
            window.location.hash = HASH_BANG + 'location=' + _slugifyLocations().join(FILTER_DELIMITER);
          } else {
            window.location.hash = HASH_BANG + 'location=' + _slugifyLocations().join(FILTER_DELIMITER) + '&department=' + _slugifyDepartments().join(FILTER_DELIMITER);
          }
        }

        if (_key2 === 'department') {

          if (vm.checkedLocations.length === 0) {
            window.location.hash = HASH_BANG + 'department=' + _slugifyDepartments().join(FILTER_DELIMITER);
          } else {
            window.location.hash = HASH_BANG + 'department=' + _slugifyDepartments().join(FILTER_DELIMITER) + '&location=' + _slugifyLocations().join(FILTER_DELIMITER);
          }
        }
      }
    } else {
      // doesn't have a hash
      window.location.hash = HASH_BANG + key + '=' + value;
    }

    // Remove the hash bang from the URL
    if (vm.checkedLocations.length === 0 && vm.checkedDepartments.length === 0) {
      _removeHash();
    }
  }

  function init() {
    // NProgress.start();
    $(window).on('hashchange', function() {
      vm.applyFilters();
    });
  }

  function _slugifyLocations() {
    return vm.checkedLocations.map(function(l) {
      return careers.shared.slugifyLocation(l);
    });
  }

  function _slugifyDepartments() {
    return vm.checkedDepartments.map(function(d) {
      return careers.shared.slugifyDepartment(d);
    });
  }

  function _unSlugifyDepartment(text) {
    return text.toString().replace('+', ' ').replace('_', '-');
  }

  function _unSlugifyLocation(text) {
    return text.toString().replace('.', ', ').replace('-', ' ');
  }

  function _hasHash() {
    return _getHashValue().substr(HASH_BANG.length) !== ''; //  3 = #!/
  }

  function _getHashValue() {
    return window.location.hash.substr(HASH_BANG.length);
  }

  function _removeHash() {
    _setPageTitle();
    history.pushState("", document.title, window.location.pathname + window.location.search);
  }

  function _selectOption(filter, value) {
    setTimeout(function() {
      $('select.' + filter + ' option[value="' + value + '"]').attr('selected', 'selected');
    }, 1);
  }

  function _removeTaleoIframe() {
    $('#taleoApplyFrame').remove();
  }

  function _setPageTitle(title) {

    if (!title) {
      title = 'Job Search';
    }

    document.title = title;
  }



  return {
    vm: vm,
    init: init
  };

}(jQuery);

(function(jQuery) {
  careers.search.init();
})();
