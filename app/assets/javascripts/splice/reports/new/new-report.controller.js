/**
 * Copyright 2013-2014 Red Hat, Inc.
 *
 * This software is licensed to you under the GNU General Public
 * License as published by the Free Software Foundation; either version
 * 2 of the License (GPLv2) or (at your option) any later version.
 * There is NO WARRANTY for this software, express or implied,
 * including the implied warranties of MERCHANTABILITY,
 * NON-INFRINGEMENT, or FITNESS FOR A PARTICULAR PURPOSE. You should
 * have received a copy of GPLv2 along with this software; if not, see
 * http://www.gnu.org/licenses/old-licenses/gpl-2.0.txt.
*/

/**
 * @ngdoc object
 * @name  Splice.reports.controller:NewReportController
 *
 * @requires $scope
 * @requires $q
 * @requires FormUtils
 * @requires Report
 * @requires Organization
 * @requires CurrentOrganization
 * @requires ContentView
 *
 * @description
 *   Controls the creation of an empty Report object for use by sub-controllers.
 */
angular.module('Splice.reports').controller('NewReportController',
    ['$scope', '$q', 'FormUtils', 'Report', 'Organization', 'CurrentOrganization', 'ContentView',
    function ($scope, $q, FormUtils, Report, Organization, CurrentOrganization, ContentView) {

        $scope.report = $scope.report || new Report();
        $scope.panel = {loading: false};
        $scope.organization = CurrentOrganization;

        $scope.$watch('report.name', function () {
            if ($scope.reportForm.name) {
                $scope.reportForm.name.$setValidity('server', true);
            }
        });

        $scope.save = function (report) {
            report['organization_id'] = CurrentOrganization;
            report.$save(success, error);
        };

        function success(response) {
            $scope.table.addRow(response);
            $scope.transitionTo('reports.details.info', {reportId: $scope.report.id});
        }

        function error(response) {
            $scope.working = false;
            angular.forEach(response.data.errors, function (errors, field) {
                $scope.reportForm[field].$setValidity('server', false);
                $scope.reportForm[field].$error.messages = errors;
            });
        }

    }]
);
