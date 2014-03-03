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
 * @name  Splice.reports.controller:ReportDetailsController
 *
 * @requires $scope
 * @requires $state
 * @requires $q
 * @requires gettext
 * @requires Report
 *
 * @description
 *   Provides the functionality for the activation key details action pane.
 */
angular.module('Splice.reports').controller('ReportDetailsController',
    ['$scope', '$state', '$q', 'gettext', 'Report',
    function ($scope, $state, $q, gettext, Report) {
        $scope.successMessages = [];
        $scope.errorMessages = [];

        if ($scope.report) {
            $scope.panel = {loading: false};
        } else {
            $scope.panel = {loading: true};
        }

        $scope.report = Report.get({id: $scope.$stateParams.reportId}, function (report) {
            $scope.$broadcast('report.loaded', report);
            $scope.panel.loading = false;
        });

        $scope.save = function (report) {
            var deferred = $q.defer();

            report.$update(function (response) {
                deferred.resolve(response);
                $scope.successMessages.push(gettext('Activation Key updated'));
                $scope.table.replaceRow(response);
            }, function (response) {
                deferred.reject(response);
                $scope.errorMessages.push(gettext("An error occurred saving the Activation Key: ") + response.data.displayMessage);
            });
            return deferred.promise;
        };

        $scope.removeReport = function (report) {
            var id = report.id;

            report.$delete(function () {
                $scope.removeRow(id);
                $scope.transitionTo('reports.index');
                $scope.successMessages.push(gettext('Report removed.'));
            }, function (response) {
                $scope.errorMessages.push(gettext("An error occurred removing the Report: ") + response.data.displayMessage);
            });
        };

    }]
);
