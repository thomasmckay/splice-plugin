/**
 Copyright 2013-2014 Red Hat, Inc.

 This software is licensed to you under the GNU General Public
 License as published by the Free Software Foundation; either version
 2 of the License (GPLv2) or (at your option) any later version.
 There is NO WARRANTY for this software, express or implied,
 including the implied warranties of MERCHANTABILITY,
 NON-INFRINGEMENT, or FITNESS FOR A PARTICULAR PURPOSE. You should
 have received a copy of GPLv2 along with this software; if not, see
 http://www.gnu.org/licenses/old-licenses/gpl-2.0.txt.
 **/

/**
 * @ngdoc module
 * @name  Splice.reports
 *
 * @description
 *   Module for activation keys related functionality.
 */
angular.module('Splice.reports', [
    'ngResource',
    'ui.router',
    'Bastion.utils',
    'Bastion.widgets'
]);

angular.module('Splice.reports').config(['$stateProvider', function ($stateProvider) {
    $stateProvider.state('reports', {
        abstract: true,
        controller: 'ReportsController',
        templateUrl: 'splice/reports/views/reports.html'
    })
    .state('reports.index', {
        url: '/reports',
        views: {
            'table': {
                templateUrl: 'splice/reports/views/reports-table-full.html'
            }
        }
    })
    .state('reports.new', {
        url: '/reports/new',
        collapsed: true,
        views: {
            'table': {
                templateUrl: 'splice/reports/views/reports-table-collapsed.html'
            },
            'action-panel': {
                controller: 'NewReportController',
                templateUrl: 'splice/reports/new/views/report-new.html'
            }
        }
    });

    $stateProvider.state("reports.details", {
        abstract: true,
        url: '/reports/:reportId',
        collapsed: true,
        views: {
            'table': {
                templateUrl: 'splice/reports/views/reports-table-collapsed.html'
            },
            'action-panel': {
                controller: 'ReportDetailsController',
                templateUrl: 'splice/reports/details/views/report-details.html'
            }
        }
    })
    .state('reports.details.info', {
        url: '/info',
        collapsed: true,
        controller: 'ReportDetailsInfoController',
        templateUrl: 'splice/reports/details/views/report-info.html'
    });

    $stateProvider.state('reports.details.operating-systems', {
        abstract: true,
        collapsed: true,
        templateUrl: 'splice/reports/details/views/report-operating-systems.html'
    })
    .state('reports.details.operating-systems.list', {
        url: '/operating-systems',
        collapsed: true,
        controller: 'ReportOperatingSystemsController',
        templateUrl: 'splice/reports/details/views/report-operating-systems-table.html'
    })
    .state('reports.details.operating-systems.add', {
        url: '/operating-systems/add',
        collapsed: true,
        controller: 'ReportAddOperatingSystemsController',
        templateUrl: 'splice/reports/details/views/report-operating-systems-table.html'
    });

}]);
