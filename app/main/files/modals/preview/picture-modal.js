angular.module('web')
  .controller('pictureModalCtrl', ['$scope', '$uibModalInstance', '$timeout', '$uibModal', 'ossSvs2', 'safeApply', 'showFn', 'bucketInfo', 'objectInfo', 'fileType',
    function ($scope, $modalInstance, $timeout, $modal, ossSvs2, safeApply, showFn, bucketInfo, objectInfo, fileType) {

      angular.extend($scope, {
        bucketInfo: bucketInfo,
        objectInfo: objectInfo,
        fileType: fileType,
        afterCheckSuccess: afterCheckSuccess,
        afterRestoreSubmit: afterRestoreSubmit,

        previewBarVisible: false,
        showFn: showFn,
        cancel: cancel,

        MAX_SIZE: 5 * 1024 * 1024 //5MB
      });

      function afterRestoreSubmit() {
        showFn.callback(true);
      }

      function afterCheckSuccess() {
        $scope.previewBarVisible = true;
        if (objectInfo.size < $scope.MAX_SIZE) {
          getContent();
        }
      }

      function cancel() {
        $modalInstance.dismiss('close');
      }

      function getContent() {
        var url = ossSvs2.signatureUrl(bucketInfo.region, bucketInfo.bucket, objectInfo.path);
        $timeout(function () {
          $scope.imgsrc = url;
        }, 300);
      }

    }
  ]);
