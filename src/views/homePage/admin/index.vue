<template>
  <div class="layout">
    <!-- <div
      id="background"
      style="position: absolute; z-index: -10; width:100%; height:100%; top:0px; left:0px;   background-color: rgba(227, 241, 247,0.8)"
    >
      <img src="@/assets/img/bg.jpg" width="100%" height="100%" />
    </div>-->
    <div class="titlePart">
      <!-- <div
      style="position: absolute; z-index: -1; width:100%; height:100%; top:0px; left:0px; background: transparent;"
      >-->
      <div class="col-sm-12 col-md-12 pd title-info">户外赛事智能安全保障平台</div>
      <div class="analysis-filter">
        <span style="padding-top: -10px;">{{date}}</span>
        <span style="margin-left: 20px; margin-top: 10px;">
          <el-tooltip
            style="margin-right: 10px;"
            class="item"
            effect="light"
            content="刷新"
            placement="top-start"
          >
            <svg
              @click="reset"
              t="1654350962783"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="6443"
              data-spm-anchor-id="a313x.7781069.0.i24"
              width="20"
              height="20"
            >
              <path
                d="M332.8 640m-230.4 0a230.4 230.4 0 1 0 460.8 0 230.4 230.4 0 1 0-460.8 0Z"
                fill="#5AC8FA"
                p-id="6444"
              />
              <path
                d="M819.2 204.8c-81.92-81.92-189.44-128-307.2-128-240.64 0-435.2 194.56-435.2 435.2s194.56 435.2 435.2 435.2 435.2-194.56 435.2-435.2c0-46.08-10.24-97.28-20.48-138.24-5.12-15.36 0-30.72 15.36-35.84 10.24 0 25.6 5.12 30.72 20.48 15.36 51.2 25.6 102.4 25.6 153.6 0 266.24-220.16 486.4-486.4 486.4S25.6 778.24 25.6 512 245.76 25.6 512 25.6c133.12 0 250.88 51.2 343.04 143.36V25.6c0-15.36 10.24-25.6 25.6-25.6s25.6 10.24 25.6 25.6v204.8c0 15.36-10.24 25.6-25.6 25.6h-204.8c-15.36 0-25.6-10.24-25.6-25.6s10.24-25.6 25.6-25.6H819.2z"
                fill="#b188d4"
                p-id="6445"
                data-spm-anchor-id="a313x.7781069.0.i25"
                class="selected"
              />
            </svg>
          </el-tooltip>
          <el-tooltip
            style="margin-right: 10px;"
            class="item"
            effect="light"
            content="进入操作详情页"
            placement="top-start"
          >
            <svg
              @click="skip"
              t="1654345810276"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="2218"
              width="20"
              height="20"
            >
              <path
                d="M346.2 514.6m-64.2 0a64.2 64.2 0 1 0 128.4 0 64.2 64.2 0 1 0-128.4 0Z"
                fill="#91B1D5"
                p-id="2219"
              />
              <path
                d="M450.1 514.6a64.2 64.2 0 1 0 128.4 0 64.2 64.2 0 1 0-128.4 0Z"
                fill="#91B1D5"
                p-id="2220"
              />
              <path
                d="M682.5 514.6m-64.2 0a64.2 64.2 0 1 0 128.4 0 64.2 64.2 0 1 0-128.4 0Z"
                fill="#91B1D5"
                p-id="2221"
              />
              <path
                d="M512 136.3c50.7 0 99.9 9.9 146.2 29.5 44.7 18.9 84.9 46 119.5 80.6 34.5 34.5 61.6 74.7 80.6 119.5 19.6 46.3 29.5 95.5 29.5 146.2s-9.9 99.9-29.5 146.2c-18.9 44.7-46 84.9-80.6 119.5-34.5 34.5-74.7 61.6-119.5 80.6-46.3 19.6-95.5 29.5-146.2 29.5s-99.9-9.9-146.2-29.5c-44.7-18.9-84.9-46-119.4-80.6-34.5-34.5-61.6-74.7-80.6-119.5-19.6-46.3-29.5-95.5-29.5-146.2s9.9-99.9 29.5-146.2c18.9-44.7 46-84.9 80.6-119.5 34.5-34.5 74.7-61.6 119.4-80.6 46.3-19.6 95.5-29.5 146.2-29.5m0-70C265.9 66.3 66.3 265.9 66.3 512S265.9 957.7 512 957.7 957.7 758.1 957.7 512 758.1 66.3 512 66.3z"
                fill="#91B1D5"
                p-id="2222"
              />
            </svg>
          </el-tooltip>
          <el-tooltip class="item" effect="light" content="注销" placement="top-start">
            <svg
              @click="logout"
              t="1654345856153"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="3111"
              width="20"
              height="20"
            >
              <path
                d="M980.522459 379.849054C933.428449 222.83239 809.469502 99.652683 650.314927 53.038205v332.705093c0 76.065717-61.979473 137.395824-138.824429 137.395824-76.854946 0-138.824429-61.340098-138.82443-137.395824V53.527727C113.838829 129.103922-33.916878 398.500839 42.438556 654.650693c76.355434 256.149854 348.55961 402.387044 607.866381 326.810848 259.316761-75.566205 406.582946-345.452644 330.217522-601.612487z"
                p-id="3112"
                fill="#d4237a"
              />
              <path
                d="M511.480507 434.815376c38.182712 0 69.412215-30.909815 69.412215-68.702908V90.331785c0-37.783102-31.239493-68.702907-69.412215-68.702907C473.307785 21.638868 442.068293 52.548683 442.068293 90.331785v275.780683c0 37.783102 31.239493 68.702907 69.412214 68.702908z"
                p-id="3113"
                fill="#d4237a"
              />
            </svg>
          </el-tooltip>
        </span>
      </div>
    </div>
    <div class="content">
      <el-row type="flex" justify>
        <el-col :span="6">
          <div class="left">
            <div class="top">
              <div
                class="title"
                style="text-align: center;
               color: #00f6ff; font-size: 23px; line-height: 60px; height: 60px;"
              >
                <img src="@/assets/img/icon01.png" alt style="margin-top:10px;" />
                用户统计
              </div>
              <div style=" z-index: 60;">
                <div style="height: 60px; width: 70%; margin-top: 8px; margin-left: 15%; ">
                  <el-row type="flex" justify style="height: 50px;">
                    <el-col
                      :span="1"
                      style="width: 60px;background-color: #073afa; text-align: center; "
                    >
                      <svg
                        style="text-align: center; height: 50px;"
                        t="1655106448711"
                        class="icon"
                        viewBox="0 0 1024 1024"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        p-id="2466"
                        width="45"
                        height="45"
                      >
                        <path
                          d="M677.8 734.2H346.4c-66.4 0-120.4-54-120.4-120.4V410.6c0-66.4 54-120.4 120.4-120.4h331.4c66.4 0 120.4 54 120.4 120.4v203.3c-0.1 66.3-54 120.3-120.4 120.3z m-331.4-384c-33.3 0-60.4 27.1-60.4 60.4v203.3c0 33.3 27.1 60.4 60.4 60.4h331.4c33.3 0 60.4-27.1 60.4-60.4V410.6c0-33.3-27.1-60.4-60.4-60.4H346.4z"
                          fill="#f4ea2a"
                          p-id="2467"
                        />
                        <path
                          d="M670.1 291h-60v-47.6c0-10.2-15.7-21.6-36.7-21.6H450.7c-21 0-36.7 11.4-36.7 21.6V291h-60v-47.6c0-22.9 11.4-44.9 31.2-60.2 17.8-13.8 41.1-21.4 65.5-21.4h122.7c24.4 0 47.7 7.6 65.5 21.4 19.8 15.3 31.2 37.3 31.2 60.2V291zM572.7 861.9H450c-24.4 0-47.7-7.6-65.5-21.3-19.8-15.3-31.2-37.2-31.2-60.1V733h60v47.5c0 10.1 15.7 21.4 36.7 21.4h122.7c21 0 36.7-11.3 36.7-21.4V733h60v47.5c0 22.9-11.4 44.8-31.2 60.1-17.9 13.7-41.1 21.3-65.5 21.3z"
                          fill="#f4ea2a"
                          p-id="2468"
                        />
                        <path
                          d="M369.7 512.6m-50.4 0a50.4 50.4 0 1 0 100.8 0 50.4 50.4 0 1 0-100.8 0Z"
                          fill="#f4ea2a"
                          p-id="2469"
                        />
                        <path
                          d="M511.3 512.6m-50.4 0a50.4 50.4 0 1 0 100.8 0 50.4 50.4 0 1 0-100.8 0Z"
                          fill="#f4ea2a"
                          p-id="2470"
                        />
                        <path
                          d="M652.9 512.6m-50.4 0a50.4 50.4 0 1 0 100.8 0 50.4 50.4 0 1 0-100.8 0Z"
                          fill="#f4ea2a"
                          p-id="2471"
                        />
                      </svg>
                    </el-col>
                    <el-col
                      :span="6"
                      style="width: 220px;background-color: #001468; text-align: center; border-radius: 0px 20px 20px 00px;"
                    >
                      <span style="font-size: 15px; height: 25px; line-height: 25px;">全部用户</span>
                      <br />
                      <span style="font-size: 16px; height: 25px; line-height: 25px;">{{allUser}}</span>
                    </el-col>
                  </el-row>
                </div>
                <div style="height: 60px; width: 70%; margin-top: 8px; margin-left: 15%; ">
                  <el-row type="flex" justify style="height: 50px;">
                    <el-col
                      :span="1"
                      style="width: 60px;background-color: #073afa; text-align: center; "
                    >
                      <svg
                        style="text-align: center; height: 50px;"
                        t="1655109160158"
                        class="icon"
                        viewBox="0 0 1024 1024"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        p-id="4316"
                        width="40"
                        height="40"
                      >
                        <path
                          d="M952 318.494H73.6c-27.2 59.2-41.6 124.8-41.6 193.6s14.4 134.4 41.6 193.6h876.8c27.2-59.2 41.6-124.8 41.6-193.6s-14.4-134.4-40-193.6z"
                          fill="#9DE8F7"
                          p-id="4317"
                        />
                        <path
                          d="M1024 512.094c0-283.2-228.8-512-512-512s-512 228.8-512 512c0 249.6 179.2 457.6 416 502.4l0.032 0.032c13.376 2.56 32.48 5.776 53.024 7.712 11.36 0.912 22.8 1.456 34.272 1.664 1.536 0 3.072 0.016 4.592-0.016 38.784-0.784 89.44-9.248 105.36-12.064C847.44 966.494 1024 759.822 1024 512.094z m-88-225.6h-78.4c-48-104-118.4-177.6-174.4-222.4 108.8 41.6 198.4 121.6 252.8 222.4z m-342.4-248c14.4 8 152 89.6 228.8 248h-180.8c-28.8-120-72-211.2-94.4-252.8 16 1.6 32 3.2 46.4 4.8z m16 248H416c32-129.6 80-222.4 96-251.2 16 28.8 64 121.6 97.6 251.2z m-132.8-252.8c-22.4 41.6-65.6 132.8-94.4 252.8h-180.8c76.8-158.4 216-240 228.8-248 14.4-1.6 30.4-3.2 46.4-4.8z m-136 30.4c-54.4 44.8-126.4 118.4-172.8 222.4H88c54.4-100.8 144-180.8 252.8-222.4z m-308.8 448c0-68.8 14.4-134.4 41.6-193.6H952c25.6 59.2 40 124.8 40 193.6s-14.4 134.4-41.6 193.6H73.6c-27.2-59.2-41.6-124.8-41.6-193.6z m56 225.6h76.8c46.4 102.4 115.2 176 171.2 220.8-105.6-41.6-193.6-121.6-248-220.8z m337.6 246.4c-28.8-17.6-153.6-97.6-225.6-246.4h176c19.2 83.2 51.2 168 100.8 252.8-16-1.6-33.6-3.2-51.2-6.4z m-16-246.4h204.8c-19.2 81.6-52.8 164.8-102.4 248-49.6-84.8-83.2-168-102.4-248z m136 252.8c49.6-84.8 81.6-171.2 100.8-252.8h176c-70.4 148.8-196.8 230.4-224 246.4-17.6 3.2-35.2 4.8-52.8 6.4z m142.4-32c54.4-46.4 124.8-118.4 171.2-220.8H936c-54.4 99.2-142.4 179.2-248 220.8z"
                          fill
                          p-id="4318"
                        />
                        <path
                          d="M105.6 507.198c0-19.2 3.2-35.2 8-49.6 4.8-9.6 11.2-17.6 17.6-25.6 8-8 16-12.8 24-17.6 11.2-4.8 25.6-8 41.6-8 28.8 0 51.2 8 67.2 25.6 17.6 17.6 25.6 41.6 25.6 72s-8 54.4-25.6 72c-16 17.6-38.4 25.6-67.2 25.6s-51.2-8-67.2-25.6-24-38.4-24-68.8z m40-1.6c0 22.4 4.8 38.4 14.4 49.6 9.6 11.2 22.4 16 38.4 16s27.2-4.8 38.4-16c9.6-11.2 14.4-27.2 14.4-49.6 0-22.4-4.8-38.4-14.4-49.6s-22.4-16-38.4-16-28.8 4.8-38.4 16c-9.6 11.2-14.4 27.2-14.4 49.6zM446.4 601.598h-36.8v-70.4c0-14.4 0-24-1.6-28.8s-4.8-8-8-9.6c-3.2-3.2-8-3.2-12.8-3.2-6.4 0-12.8 1.6-17.6 4.8-4.8 3.2-8 8-9.6 14.4s-3.2 16-3.2 32v62.4H320v-137.6h33.6v20.8c12.8-16 27.2-24 44.8-24 8 0 16 1.6 22.4 4.8 6.4 3.2 11.2 6.4 14.4 11.2 3.2 4.8 6.4 9.6 6.4 16 1.6 6.4 1.6 14.4 1.6 24l3.2 83.2zM483.2 601.598v-192H520v190.4h-36.8v1.6zM556.8 444.798v-33.6h36.8v33.6h-36.8z m0 156.8v-137.6h36.8v137.6h-36.8zM756.8 601.598H720v-70.4c0-14.4 0-24-1.6-28.8s-4.8-8-8-9.6c-3.2-3.2-8-3.2-12.8-3.2-6.4 0-12.8 1.6-17.6 4.8-4.8 3.2-8 8-9.6 14.4s-3.2 16-3.2 32v62.4h-36.8v-137.6H664v20.8c12.8-16 27.2-24 44.8-24 8 0 16 1.6 22.4 4.8 6.4 3.2 11.2 6.4 14.4 11.2s6.4 9.6 6.4 16c1.6 6.4 1.6 14.4 1.6 24l3.2 83.2zM873.6 556.798l36.8 6.4c-4.8 12.8-12.8 24-22.4 30.4s-22.4 11.2-38.4 11.2c-24 0-41.6-8-52.8-24-9.6-12.8-14.4-28.8-14.4-48 0-22.4 6.4-41.6 17.6-54.4 11.2-12.8 27.2-19.2 44.8-19.2 20.8 0 36.8 6.4 48 20.8 11.2 12.8 17.6 33.6 17.6 62.4h-91.2c0 11.2 3.2 19.2 9.6 25.6s12.8 9.6 20.8 9.6c6.4 0 11.2-1.6 14.4-4.8s8-8 9.6-16z m3.2-36.8c0-11.2-3.2-19.2-8-24s-11.2-8-19.2-8-14.4 3.2-19.2 8c-4.8 6.4-8 14.4-8 24h54.4z"
                          fill
                          p-id="4319"
                        />
                      </svg>
                    </el-col>
                    <el-col
                      :span="6"
                      style="width: 220px;background-color: #001468; text-align: center; border-radius: 0px 20px 20px 00px;"
                    >
                      <span style="font-size: 15px; height: 25px; line-height: 25px;">在线用户</span>
                      <br />
                      <span style="font-size: 16px; height: 25px; line-height: 25px;">{{allUser}}</span>
                    </el-col>
                  </el-row>
                </div>
                <div style="height: 60px; width: 70%; margin-top: 8px; margin-left: 15%; ">
                  <el-row type="flex" justify style="height: 50px;">
                    <el-col
                      :span="1"
                      style="width: 60px;background-color: #073afa; text-align: center; "
                    >
                      <svg
                        style="text-align: center; height: 50px;"
                        t="1655108693595"
                        class="icon"
                        viewBox="0 0 1098 1024"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        p-id="3358"
                        width="40"
                        height="40"
                      >
                        <path
                          d="M387.638958 625.365762c-172.41927 0-312.676732-140.208266-312.676732-312.676731S215.170492 0 387.638958 0s312.676732 140.269761 312.676732 312.689031-140.269761 312.676732-312.676732 312.676731z m0-554.17932c-133.160956 0-241.502588 108.341633-241.502588 241.502589s108.341633 241.490289 241.502588 241.490289 241.490289-108.329334 241.490289-241.490289S520.799914 71.186442 387.638958 71.186442z"
                          p-id="3359"
                          fill="#fe4b4e"
                        />
                        <path
                          d="M739.684695 1024a35.593221 35.593221 0 0 1-35.593221-35.593221c0-174.485497-141.967019-316.452516-316.452516-316.452516s-316.452516 141.967019-316.452516 316.452516a35.593221 35.593221 0 0 1-71.186442 0c0-213.743811 173.895146-387.638958 387.638958-387.638958s387.626659 173.895146 387.626659 387.638958a35.593221 35.593221 0 0 1-35.580922 35.593221zM664.722468 635.610805a35.593221 35.593221 0 0 1 0-71.186442c133.160956 0 241.490289-108.329334 241.49029-241.49029S797.883424 81.431485 664.722468 81.431485a35.593221 35.593221 0 1 1 0-71.174143c172.394672 0.036897 312.676732 140.245163 312.676732 312.676731S837.11714 635.610805 664.722468 635.610805z"
                          p-id="3360"
                          fill="#fe4b4e"
                        />
                        <path
                          d="M1063.098428 1019.252597a35.593221 35.593221 0 0 1-35.593221-35.593221c0-203.203594-149.174215-345.109117-362.819635-345.109117a35.593221 35.593221 0 0 1 0-71.186442c118.562077 0 227.297277 39.860964 306.24437 112.265004a384.281339 384.281339 0 0 1 93.718156 132.078646c22.593209 52.479708 34.043551 110.334066 34.043551 171.951909a35.593221 35.593221 0 0 1-35.593221 35.593221z"
                          p-id="3361"
                          fill="#fe4b4e"
                        />
                      </svg>
                    </el-col>
                    <el-col
                      :span="6"
                      style="width: 220px;background-color: #001468; text-align: center; border-radius: 0px 20px 20px 00px;"
                    >
                      <span style="font-size: 15px; height: 25px; line-height: 25px;">小组数</span>
                      <br />
                      <span style="font-size: 16px; height: 25px; line-height: 25px;">{{groupNum}}</span>
                    </el-col>
                  </el-row>
                </div>
                <div style="height: 60px; width: 70%; margin-top: 8px; margin-left: 15%; ">
                  <el-row type="flex" justify style="height: 50px;">
                    <el-col
                      :span="1"
                      style="width: 60px;background-color: #073afa; text-align: center; "
                    >
                      <svg
                        style="text-align: center; height: 50px;"
                        t="1655108403250"
                        class="icon"
                        viewBox="0 0 1024 1024"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        p-id="2885"
                        width="40"
                        height="40"
                      >
                        <path
                          d="M980.864 584.96a473.696 473.696 0 0 1-395.936 400.928v36.608H439.04V985.92A473.664 473.664 0 0 1 43.136 584.864h-41.6v-145.76h43.328A473.92 473.92 0 0 1 439.072 50.176V1.504h145.888v48.768A474.016 474.016 0 0 1 979.168 439.04h43.328v145.92h-41.632zM475.552 977.216h72.96v-72.928h-72.96v72.928z m-428.8-501.664v72.928h72.96v-72.928h-72.96z m501.76-428.768h-72.96v72.928h72.96V46.784z m33.152 77.152v40.032h-139.328v-40a400.64 400.64 0 0 0-323.68 318.656h45.024v139.328H116.768a400.416 400.416 0 0 0 325.568 330.208v-51.584h139.328v51.584a400.416 400.416 0 0 0 325.568-330.208h-46.912v-139.328h45.088a400.864 400.864 0 0 0-323.744-318.656v-0.032z m395.584 351.616h-72.992v72.928h72.992v-72.928z"
                          p-id="2886"
                          fill="#00f3e6"
                        />
                        <path
                          d="M285.12 512a226.88 226.88 0 1 0 453.792 0A226.88 226.88 0 0 0 285.12 512"
                          p-id="2887"
                          fill="#00f3e6"
                        />
                      </svg>
                    </el-col>
                    <el-col
                      :span="6"
                      style="width: 220px;background-color: #001468; text-align: center; border-radius: 0px 20px 20px 00px;"
                    >
                      <span style="font-size: 15px; height: 25px; line-height: 25px;">电子围栏</span>
                      <br />
                      <span style="font-size: 16px; height: 25px; line-height: 25px;">{{fenceNum}}</span>
                    </el-col>
                  </el-row>
                </div>
              </div>
              <div
                class="title"
                style="text-align: center;
               color: #00f6ff; font-size: 23px; line-height: 80px; height: 80px;"
              >
                <img src="@/assets/img/icon05.png" alt style="margin-top:10px;" />
                今日报警
              </div>
              <!-- <p style = "color: #00f6fe;text-align: left; font-size: 18px; margin-left: 30px;"></p> -->
            </div>
            <div class="bottom" v-if="alertShow">
              <vue-seamless-scroll :data="alertInfo" class="seamless-warp">
                <div class="cardList" v-for="(item,index) in alertInfo" :key="index">
                  <p style="color: #fff; font-size: 15px; margin-left: 20px;">
                    <span>{{index+1}}、</span>
                    <span style="margin-top: 20px;">{{item.productName}}____{{item.deviceName}}</span>
                  </p>
                  <p style="margin-left: 20px;">
                    <span style="color: #fff; font-size: 15px; line-height: 30px;">报警内容:</span>

                    <span
                      style="color: #e29755; font-size: 17px;line-height: 30px;"
                    >{{item.Content}}</span>
                    <!-- <br /> -->
                    <span
                      style="color: #fff; font-size: 15px; float: right; margin-right: 20px;line-height: 30px;"
                    >{{item.date}}</span>
                  </p>

                  <div class="divider" style="margin-left: 10%;"></div>
                </div>
              </vue-seamless-scroll>
            </div>
          </div>
        </el-col>
        <el-col :span="12" class="map">
          <div
            class="title"
            style="position: absolute; top: 5px; left: 40%;
          color: #00f6ff; font-size: 23px; line-height: 70px; height: 70px;"
          >
            <img src="@/assets/img/icon03.png" alt style="margin-top:10px;" />
            平台数据分布
          </div>
          <div class="map1">
            <img src="@/assets/img/lbx.png" />
          </div>
          <div class="map2">
            <img src="@/assets/img/jt.png" />
          </div>
          <div class="map3">
            <img src="@/assets/img/map.png" />
          </div>
          <div id="mapBody"></div>
        </el-col>
        <el-col :span="6">
          <div class="right">
            <div class="top" v-if = "productShow">
                            <div
                class="title"
                style="text-align: center;
               color: #00f6ff; font-size: 23px; line-height: 80px; height: 80px;"
              >
                <img src="@/assets/img/icon06.png" alt style="margin-top:10px;" />
                数据统计
              </div>
              <vue-seamless-scroll :data="productList" class="seamless-warp">
<div class = "cardList" style = "color: #fff; " v-for="(item,index) in productList" :key="index">
  <p style = "color: #e29755; font-size: 18px;line-height: 30px; margin-left: 20px; height: 20px;" >{{index+1}}、
  {{item.productName}} </p>
   <table border="1" 
cellspacing="0"
style = "margin-left: 10px; margin-top:0px;">
     <tr style = "height: 20px; line-height: 20px; background-color:#010d50; border: 1px solid #19308e">
            <td style = "font-size: 15px; padding: 5px 20px; width: 15%; text-align: center; color: #9d9fa5">温度</td>
             <td style = "font-size: 15px; padding: 5px 20px; width: 15%; text-align: center;background-color:#00093c; color: #9d9fa5">{{item.latestData.body}}</td>
           <td style = "font-size: 15px;padding: 5px 20px; width: 15%; text-align: center;color: #9d9fa5" >心率</td>
              <td style = "font-size: 15px;padding: 5px 20px; width: 15%; text-align: center; background-color:#00093c;color: #9d9fa5" >{{item.latestData.heartRate}}</td>
           <td   style = "font-size: 15px; padding: 5px 20px; width: 15%; text-align: center; color: #9d9fa5">步数</td>
                      <td   style = "font-size: 15px; padding: 5px 20px; width: 15%; text-align: center; background-color:#00093c;color: #9d9fa5">{{item.latestData.stepNum}}</td>

     </tr>
   </table>
    <!-- <span style = "color: #fff;"> 温度： {{item.latestData.body}}</span>
    <span style = "color: #fff;">心率： {{item.latestData.heartRate}}</span> -->
   
    
 
</div>
              </vue-seamless-scroll>

            </div>
            <div id="bottom"></div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script type="text/javascript" src="./js/china.js"></script> 

<script>
import * as echarts from "echarts";
import "./js/china.js";
import { alertbyTime, allProductKey, getDeviceDatas } from "@/api/index";
import { UserDetail } from "@/api/admin";
// import "./js/area_echarts.js";
export default {
  name: "admin",
  data() {
    return {
      date: "",
      alertInfo: [],
      alertShow: false,
      productnameList: [],
      productList: [],
      judge: [],
      productShow: false,
      allUser: 0,
      fenceNum: 0,
      groupNum :0,
          };
  },
  created() {
    this.prepare();
    setTimeout(this.echarts, 1000);
  },
  mounted() {
    setInterval(this.timer, 1000);
  },
  beforeDestroy() {
    if (this.date) {
      clearInterval(this.timer);
    }
  },
  methods: {
    prepare() {
 
      console.log("初始数据准备");
       var username = window.sessionStorage.getItem("username")
       console.log(username)
UserDetail(username).then(res => {
  console.log(res)
  this.fenceNum = res.data.extraInfo.fence.length
  this.groupNum = res.data.extraInfo.groups.length
})
      var startTime = Math.floor(
        new Date(new Date().setHours(0, 0, 0, 0)).getTime() / 1000
      );
      var endTime = Math.floor(
        new Date(new Date().setHours(23, 59, 59, 999)).getTime() / 1000
      );
      this.alertInfo = [];
      var obj = {
        startTime: startTime,
        endTime: endTime,
        asc: 1,
        num: 50
      };
      // console.log(obj);
      //      var obj = {
      //   startTime: 1650297600,
      //   endTime: 1650383999,
      //   asc: 1,
      //   num:50
      // }
      alertbyTime(obj).then(res => {
        console.log(res);
        if (res.msg == "未找到记录") {
          this.alertShow = true; //为了展示改动的地方
          this.alertInfo.push(
            {
              productName: "手环测试3",
              deviceName: "AC",
              Content: "温度报警",
              date: "2022-06-06 10:02:28"
            },
            {
              productName: "手环测试5",
              deviceName: "A02",
              Content: "SOS",
              date: "2022-06-06 11:05:28"
            },
            {
              productName: "手环测试7",
              deviceName: "02",
              Content: "SOS取消",
              date: "2022-06-06 13:34:13"
            },
            {
              productName: "手环测试12",
              deviceName: "02",
              Content: "SOS取消",
              date: "2022-06-06 15:45:34"
            },
            {
              productName: "手环测试1",
              deviceName: "02",
              Content: " S0S",
              date: "2022-06-06 16:34:32"
            },
            {
              productName: "手环测试5",
              deviceName: "02",
              Content: "S0S",
              date: "2022-06-06 17:53:23"
            },
            {
              productName: "手环测试2",
              deviceName: "02",
              Content: "SOS取消",
              date: "2022-06-06 19:34:56"
            }
          );
        } else if (res.msg == "ok") {
          // this.fenceNum = res.data.
          this.alertShow = true;
          res.data.alertInfo.forEach(item => {
            this.alertInfo.push(item);
          });
          this.alertInfo.push(
            {
              productName: "手环测试3",
              deviceName: "AC",
              Content: "温度报警",
              date: "2022-06-06 10:02:28"
            },
            {
              productName: "手环测试5",
              deviceName: "A02",
              Content: "SOS",
              date: "2022-06-06 11:05:28"
            },
            {
              productName: "手环测试7",
              deviceName: "02",
              Content: "SOS取消",
              date: "2022-06-06 13:34:13"
            },
            {
              productName: "手环测试12",
              deviceName: "02",
              Content: "SOS取消",
              date: "2022-06-06 15:45:34"
            },
            {
              productName: "手环测试1",
              deviceName: "02",
              Content: " S0S",
              date: "2022-06-06 16:34:32"
            },
            {
              productName: "手环测试5",
              deviceName: "02",
              Content: "S0S",
              date: "2022-06-06 17:53:23"
            },
            {
              productName: "手环测试2",
              deviceName: "02",
              Content: "SOS取消",
              date: "2022-06-06 19:34:56"
            }
          );
        } else {
          this.$message.error(res.msg);
        }
        console.log(this.alertInfo);
        //    this.echarts();
      });
      allProductKey().then(res => {
        console.log(res);
        if (res.msg == "ok") {
          this.productnameList = res.data.productKeys;
          var username = window.sessionStorage.getItem("username");
          getDeviceDatas({
            username: username,
            pkList: this.productnameList,
            startTime: 10000
          }).then(res => {
            console.log(res);
            this.productList = res.data;
            this.allUser = this.productList.length
            console.log(this.productList);
            if (this.productList.length !== 0) {
              this.productList.forEach(item => {
                item.deviceName = [];
                item.latestData = [];
                if (item.deviceData !== null) {
                  for (var i = 0; i < item.deviceData.length; i++) {
                    item.deviceData.push(item.deviceData[i].deviceName);
                  }
                  if (item.extraInfo.fence !== "-") {
                    if (
                      this.fenceList.length !== 0 ||
                      this.fenceList !== null
                    ) {
                      for (var i = 0; i < this.fenceList.length; i++) {
                        if (
                          item.extraInfo.fence ==
                          this.fenceList[i].fence.fenceName
                        ) {
                          item.latestData.fence = this.fenceList[i].fence.data;
                        }
                      }
                    }
                  } else {
                    item.latestData.fence="-"
                  }
                     if (item.deviceName.includes("BA")) {
                  item.latestData.body =
                    item.deviceData[
                      item.deviceName.indexOf("BA")
                    ].extraInfo.body;
                  item.latestData.skin =
                    item.deviceData[
                      item.deviceName.indexOf("BA")
                    ].extraInfo.skin;
                }
                if (item.deviceName.includes("C2")) {
                  item.latestData.heartRate =
                    item.deviceData[
                      item.deviceName.indexOf("C2")
                    ].extraInfo.BPHeart;
                  item.latestData.bpHigh =
                    item.deviceData[
                      item.deviceName.indexOf("C2")
                    ].extraInfo.BPHigh;
                  item.latestData.bpLow =
                    item.deviceData[
                      item.deviceName.indexOf("C2")
                    ].extraInfo.BPLow;
                }
                if (item.deviceName.includes("F6")) {
                  item.latestData.stepNum =
                    item.deviceData[
                      item.deviceName.indexOf("F6")
                    ].extraInfo.StepNum;
                  item.latestData.heart =
                    item.deviceData[
                      item.deviceName.indexOf("F6")
                    ].extraInfo.timeStamp;
                }
                if (item.deviceName.includes("A4")) {
                  item.latestData.location =
                    item.deviceData[item.deviceName.indexOf("A4")].extraInfo;
                  if (item.latestData.location !== "-") {
                    var marker1 = item.latestData.location.location;
                    var array1 = marker1.split(",");
                    var marker2 = new BMap.Point(array1[0], array1[1]);
                    var polArry1 = [];
                    //   if (item.extraInfo.fence !== "-")  {
                    // console.log( item.latestData)
                    // if (item.latestData.fence!==undefined) {
                    // if (item.latestData.fence !== "-") {
                    //   item.latestData.fence.forEach(item1 => {
                    //     var p = new BMap.Point(item1.lng, item1.lat);
                    //     polArry1.push(p);
                    //   });
                    //   var polygon1 = new BMap.Polygon(polArry1);
                    //   if (
                    //     BMapLib.GeoUtils.isPointInPolygon(marker2, polygon1)
                    //   ) {
                    //     item.latestData.ifIn = "in";
                    //   } else {
                    //     item.latestData.ifIn = "out";
                    //   }
                    // }
                  }
                }
                }
                else {
                item.latestData = {
                  body: "-",
                  skin: "-",
                  heartRate: "-",
                  bpHigh: "-",
                  bpLow: "-",
                  stepNum: "-",
                  location: "",
                  heart: "-",
                  fence: "-",
                  ifIn: "-"
                };
              }
              
              });
              console.log(this.productList)
              if (this.productList.length !==0) {
                this.productShow = true
              }
            }
          });
        }
      });
    },
    timer() {
      let year = new Date().getFullYear(); //获取当前时间的年份
      let month =
        new Date().getMonth + 1 < 10
          ? "0" + (new Date().getMonth() + 1)
          : new Date().getMonth() + 1; //获取当前的月份
      let Day =
        new Date().getDate() < 10
          ? "0" + new Date().getDate()
          : new Date().getDate(); //获取当前时间的天数、
      let hours =
        new Date().getHours() < 10
          ? "0" + new Date().getHours()
          : new Date().getHours(); //获取当前的小时数
      let minutes =
        new Date().getMinutes() < 10
          ? "0" + new Date().getMinutes()
          : new Date().getMinutes(); //获取当前时间的分数
      let seconds =
        new Date().getSeconds() < 10
          ? "0" + new Date().getSeconds()
          : new Date().getSeconds(); //获取当前时间的秒数
      //拼接格式化当前时间
      this.date =
        year +
        "年" +
        month +
        "月" +
        Day +
        "日" +
        hours +
        ":" +
        minutes +
        ":" +
        seconds;
    },
    skip() {
      this.$router.push({ path: "/home" });
    },
    logout() {
      this.$store.dispatch("user/logout");
      this.$router.push(`/login?redirect=${this.$route.fullPath}`);
    },
    reset() {
      this.prepare();
    },
    echarts() {
      var myChart = echarts.init(document.getElementById("mapBody"));

      var mapName = "china";
      var data = [
        { name: "大连", value: 47 },
        { name: "临汾", value: 47 },
        { name: "石嘴山", value: 49 },
        { name: "长春", value: 51 },
        { name: "胶州", value: 52 },
        { name: "三门峡", value: 53 },
        { name: "锦州", value: 54 },
        { name: "南昌", value: 54 },
        { name: "柳州", value: 54 },
        { name: "三亚", value: 54 },
        { name: "自贡", value: 56 },
        { name: "吉林", value: 56 },
        { name: "阳江", value: 57 },
        { name: "泸州", value: 57 },
        { name: "西宁", value: 57 },
        { name: "宜宾", value: 58 },
        { name: "呼和浩特", value: 58 },
        { name: "成都", value: 58 },
        { name: "大同", value: 58 },
        { name: "桂林", value: 59 },
        { name: "张家界", value: 59 },
        { name: "北海", value: 60 },
        { name: "台州", value: 67 },
        { name: "滨州", value: 70 },
        { name: "贵阳", value: 71 },
        { name: "本溪", value: 71 },
        { name: "克拉玛依", value: 72 },
        { name: "渭南", value: 72 },
        { name: "马鞍山", value: 72 },
        { name: "宝鸡", value: 72 },
        { name: "焦作", value: 75 },
        { name: "北京", value: 79 },

        { name: "大庆", value: 279 }
      ];
      var geoCoordMap = {
        海门: [121.15, 31.89],
        鄂尔多斯: [109.781327, 39.608266],
        招远: [120.38, 37.35],
        舟山: [122.207216, 29.985295],
        齐齐哈尔: [123.97, 47.33],
        盐城: [120.13, 33.38],
        赤峰: [118.87, 42.28],
        青岛: [120.33, 36.07],
        乳山: [121.52, 36.89],
        金昌: [102.188043, 38.520089],
        泉州: [118.58, 24.93],
        莱西: [120.53, 36.86],
        日照: [119.46, 35.42],
        胶南: [119.97, 35.88],
        南通: [121.05, 32.08],
        拉萨: [91.11, 29.97],
        云浮: [112.02, 22.93],
        梅州: [116.1, 24.55],
        文登: [122.05, 37.2],
        上海: [121.48, 31.22],
        攀枝花: [101.718637, 26.582347],
        威海: [122.1, 37.5],
        承德: [117.93, 40.97],
        厦门: [118.1, 24.46],
        汕尾: [115.375279, 22.786211],
        潮州: [116.63, 23.68],
        丹东: [124.37, 40.13],
        太仓: [121.1, 31.45],
        曲靖: [103.79, 25.51],
        烟台: [121.39, 37.52],
        福州: [119.3, 26.08],
        瓦房店: [121.979603, 39.627114],
        即墨: [120.45, 36.38],
        抚顺: [123.97, 41.97],
        玉溪: [102.52, 24.35],
        张家口: [114.87, 40.82],
        阳泉: [113.57, 37.85],
        莱州: [119.942327, 37.177017],
        湖州: [120.1, 30.86],
        汕头: [116.69, 23.39],
        昆山: [120.95, 31.39],
        宁波: [121.56, 29.86],
        湛江: [110.359377, 21.270708],
        揭阳: [116.35, 23.55],
        荣成: [122.41, 37.16],
        连云港: [119.16, 34.59],
        葫芦岛: [120.836932, 40.711052],
        常熟: [120.74, 31.64],
        东莞: [113.75, 23.04],
        河源: [114.68, 23.73],
        淮安: [119.15, 33.5],
        泰州: [119.9, 32.49],
        南宁: [108.33, 22.84],
        营口: [122.18, 40.65],
        惠州: [114.4, 23.09],
        江阴: [120.26, 31.91],
        蓬莱: [120.75, 37.8],
        韶关: [113.62, 24.84],
        嘉峪关: [98.289152, 39.77313],
        广州: [113.23, 23.16],
        延安: [109.47, 36.6],
        太原: [112.53, 37.87],
        清远: [113.01, 23.7],
        中山: [113.38, 22.52],
        昆明: [102.73, 25.04],
        寿光: [118.73, 36.86],
        盘锦: [122.070714, 41.119997],
        长治: [113.08, 36.18],
        深圳: [114.07, 22.62],
        珠海: [113.52, 22.3],
        宿迁: [118.3, 33.96],
        咸阳: [108.72, 34.36],
        铜川: [109.11, 35.09],
        平度: [119.97, 36.77],
        佛山: [113.11, 23.05],
        海口: [110.35, 20.02],
        江门: [113.06, 22.61],
        章丘: [117.53, 36.72],
        肇庆: [112.44, 23.05],
        大连: [121.62, 38.92],
        临汾: [111.5, 36.08],
        吴江: [120.63, 31.16],
        石嘴山: [106.39, 39.04],
        沈阳: [123.38, 41.8],
        苏州: [120.62, 31.32],
        茂名: [110.88, 21.68],
        嘉兴: [120.76, 30.77],
        长春: [125.35, 43.88],
        胶州: [120.03336, 36.264622],
        银川: [106.27, 38.47],
        张家港: [120.555821, 31.875428],
        三门峡: [111.19, 34.76],
        锦州: [121.15, 41.13],
        南昌: [115.89, 28.68],
        柳州: [109.4, 24.33],
        三亚: [109.511909, 18.252847],
        自贡: [104.778442, 29.33903],
        吉林: [126.57, 43.87],
        阳江: [111.95, 21.85],
        泸州: [105.39, 28.91],
        西宁: [101.74, 36.56],
        宜宾: [104.56, 29.77],
        呼和浩特: [111.65, 40.82],
        成都: [104.06, 30.67],
        大同: [113.3, 40.12],
        镇江: [119.44, 32.2],
        桂林: [110.28, 25.29],
        张家界: [110.479191, 29.117096],
        宜兴: [119.82, 31.36],
        北海: [109.12, 21.49],
        西安: [108.95, 34.27],
        金坛: [119.56, 31.74],
        东营: [118.49, 37.46],
        牡丹江: [129.58, 44.6],
        遵义: [106.9, 27.7],
        绍兴: [120.58, 30.01],
        扬州: [119.42, 32.39],
        常州: [119.95, 31.79],
        潍坊: [119.1, 36.62],
        重庆: [106.54, 29.59],
        台州: [121.420757, 28.656386],
        南京: [118.78, 32.04],
        滨州: [118.03, 37.36],
        贵阳: [106.71, 26.57],
        无锡: [120.29, 31.59],
        本溪: [123.73, 41.3],
        克拉玛依: [84.77, 45.59],
        渭南: [109.5, 34.52],
        马鞍山: [118.48, 31.56],
        宝鸡: [107.15, 34.38],
        焦作: [113.21, 35.24],
        句容: [119.16, 31.95],
        北京: [116.46, 39.92],
        徐州: [117.2, 34.26],
        衡水: [115.72, 37.72],
        包头: [110, 40.58],
        绵阳: [104.73, 31.48],
        乌鲁木齐: [87.68, 43.77],
        枣庄: [117.57, 34.86],
        杭州: [120.19, 30.26],
        淄博: [118.05, 36.78],
        鞍山: [122.85, 41.12],
        溧阳: [119.48, 31.43],
        库尔勒: [86.06, 41.68],
        安阳: [114.35, 36.1],
        开封: [114.35, 34.79],
        济南: [117, 36.65],
        德阳: [104.37, 31.13],
        温州: [120.65, 28.01],
        九江: [115.97, 29.71],
        邯郸: [114.47, 36.6],
        临安: [119.72, 30.23],
        兰州: [103.73, 36.03],
        沧州: [116.83, 38.33],
        临沂: [118.35, 35.05],
        南充: [106.110698, 30.837793],
        天津: [117.2, 39.13],
        富阳: [119.95, 30.07],
        泰安: [117.13, 36.18],
        诸暨: [120.23, 29.71],
        郑州: [113.65, 34.76],
        哈尔滨: [126.63, 45.75],
        聊城: [115.97, 36.45],
        芜湖: [118.38, 31.33],
        唐山: [118.02, 39.63],
        平顶山: [113.29, 33.75],
        邢台: [114.48, 37.05],
        德州: [116.29, 37.45],
        济宁: [116.59, 35.38],
        荆州: [112.239741, 30.335165],
        宜昌: [111.3, 30.7],
        义乌: [120.06, 29.32],
        丽水: [119.92, 28.45],
        洛阳: [112.44, 34.7],
        秦皇岛: [119.57, 39.95],
        株洲: [113.16, 27.83],
        石家庄: [114.48, 38.03],
        莱芜: [117.67, 36.19],
        常德: [111.69, 29.05],
        保定: [115.48, 38.85],
        湘潭: [112.91, 27.87],
        金华: [119.64, 29.12],
        岳阳: [113.09, 29.37],
        长沙: [113, 28.21],
        衢州: [118.88, 28.97],
        廊坊: [116.7, 39.53],
        菏泽: [115.480656, 35.23375],
        合肥: [117.27, 31.86],
        武汉: [114.31, 30.52],
        大庆: [125.03, 46.58]
      };
      var toolTipData = [
        { name: "海门", value: 69 },
        { name: "鄂尔多斯", value: 12 },
        { name: "招远", value: 12 },
        { name: "舟山", value: 12 },
        { name: "齐齐哈尔", value: 14 },
        { name: "盐城", value: 15 },
        { name: "赤峰", value: 16 },
        { name: "青岛", value: 18 },
        { name: "乳山", value: 18 },
        { name: "金昌", value: 19 },
        { name: "泉州", value: 21 },
        { name: "莱西", value: 21 },
        { name: "日照", value: 21 },
        { name: "胶南", value: 22 },
        { name: "南通", value: 23 },
        { name: "拉萨", value: 24 },
        { name: "云浮", value: 24 },
        { name: "梅州", value: 25 },
        { name: "文登", value: 25 },
        { name: "上海", value: 25 },
        { name: "攀枝花", value: 25 },
        { name: "威海", value: 25 },
        { name: "承德", value: 25 },
        { name: "厦门", value: 26 },
        { name: "汕尾", value: 26 },
        { name: "潮州", value: 26 },
        { name: "丹东", value: 27 },
        { name: "太仓", value: 27 },
        { name: "曲靖", value: 27 },
        { name: "烟台", value: 28 },
        { name: "福州", value: 29 },
        { name: "瓦房店", value: 30 },
        { name: "即墨", value: 30 },
        { name: "抚顺", value: 31 },
        { name: "玉溪", value: 31 },
        { name: "张家口", value: 31 },
        { name: "阳泉", value: 31 },
        { name: "莱州", value: 32 },
        { name: "湖州", value: 32 },
        { name: "汕头", value: 32 },
        { name: "昆山", value: 33 },
        { name: "宁波", value: 33 },
        { name: "湛江", value: 33 },
        { name: "揭阳", value: 34 },
        { name: "荣成", value: 34 },
        { name: "连云港", value: 35 },
        { name: "葫芦岛", value: 35 },
        { name: "常熟", value: 36 },
        { name: "东莞", value: 36 },
        { name: "河源", value: 36 },
        { name: "淮安", value: 36 },
        { name: "泰州", value: 36 },
        { name: "南宁", value: 37 },
        { name: "营口", value: 37 },
        { name: "惠州", value: 37 },
        { name: "江阴", value: 37 },
        { name: "蓬莱", value: 37 },
        { name: "韶关", value: 38 },
        { name: "嘉峪关", value: 38 },
        { name: "广州", value: 38 },
        { name: "延安", value: 38 },
        { name: "太原", value: 39 },
        { name: "清远", value: 39 },
        { name: "中山", value: 39 },
        { name: "昆明", value: 39 },
        { name: "寿光", value: 40 },
        { name: "盘锦", value: 40 },
        { name: "长治", value: 41 },
        { name: "深圳", value: 41 },
        { name: "珠海", value: 42 },
        { name: "宿迁", value: 43 },
        { name: "咸阳", value: 43 },
        { name: "铜川", value: 44 },
        { name: "平度", value: 44 },
        { name: "佛山", value: 44 },
        { name: "海口", value: 44 },
        { name: "江门", value: 45 },
        { name: "章丘", value: 45 },
        { name: "肇庆", value: 46 },
        { name: "大连", value: 47 },
        { name: "临汾", value: 47 },
        { name: "吴江", value: 47 },
        { name: "石嘴山", value: 49 },
        { name: "沈阳", value: 50 },
        { name: "苏州", value: 50 },
        { name: "茂名", value: 50 },
        { name: "嘉兴", value: 51 },
        { name: "长春", value: 51 },
        { name: "胶州", value: 52 },
        { name: "银川", value: 52 },
        { name: "张家港", value: 52 },
        { name: "三门峡", value: 53 },
        { name: "锦州", value: 54 },
        { name: "南昌", value: 54 },
        { name: "柳州", value: 54 },
        { name: "三亚", value: 54 },
        { name: "自贡", value: 56 },
        { name: "吉林", value: 56 },
        { name: "阳江", value: 57 },
        { name: "泸州", value: 57 },
        { name: "西宁", value: 57 },
        { name: "宜宾", value: 58 },
        { name: "呼和浩特", value: 58 },
        { name: "成都", value: 58 },
        { name: "大同", value: 58 },
        { name: "镇江", value: 59 },
        { name: "桂林", value: 59 },
        { name: "张家界", value: 59 },
        { name: "宜兴", value: 59 },
        { name: "北海", value: 60 },
        { name: "西安", value: 61 },
        { name: "金坛", value: 62 },
        { name: "东营", value: 62 },
        { name: "牡丹江", value: 63 },
        { name: "遵义", value: 63 },
        { name: "绍兴", value: 63 },
        { name: "扬州", value: 64 },
        { name: "常州", value: 64 },
        { name: "潍坊", value: 65 },
        { name: "重庆", value: 66 },
        { name: "台州", value: 67 },
        { name: "南京", value: 67 },
        { name: "滨州", value: 70 },
        { name: "贵阳", value: 71 },
        { name: "无锡", value: 71 },
        { name: "本溪", value: 71 },
        { name: "克拉玛依", value: 72 },
        { name: "渭南", value: 72 },
        { name: "马鞍山", value: 72 },
        { name: "宝鸡", value: 72 },
        { name: "焦作", value: 75 },
        { name: "句容", value: 75 },
        { name: "北京", value: 79 },
        { name: "徐州", value: 79 },
        { name: "衡水", value: 80 },
        { name: "包头", value: 80 },
        { name: "绵阳", value: 80 },
        { name: "乌鲁木齐", value: 84 },
        { name: "枣庄", value: 84 },
        { name: "杭州", value: 84 },
        { name: "淄博", value: 85 },
        { name: "鞍山", value: 86 },
        { name: "溧阳", value: 86 },
        { name: "库尔勒", value: 86 },
        { name: "安阳", value: 90 },
        { name: "开封", value: 90 },
        { name: "济南", value: 92 },
        { name: "德阳", value: 93 },
        { name: "温州", value: 95 },
        { name: "九江", value: 96 },
        { name: "邯郸", value: 98 },
        { name: "临安", value: 99 },
        { name: "兰州", value: 99 },
        { name: "沧州", value: 100 },
        { name: "临沂", value: 103 },
        { name: "南充", value: 104 },
        { name: "天津", value: 105 },
        { name: "富阳", value: 106 },
        { name: "泰安", value: 112 },
        { name: "诸暨", value: 112 },
        { name: "郑州", value: 313 },
        { name: "哈尔滨", value: 114 },
        { name: "聊城", value: 116 },
        { name: "芜湖", value: 117 },
        { name: "唐山", value: 119 },
        { name: "平顶山", value: 119 },
        { name: "邢台", value: 119 },
        { name: "德州", value: 120 },
        { name: "济宁", value: 120 },
        { name: "荆州", value: 127 },
        { name: "宜昌", value: 130 },
        { name: "义乌", value: 132 },
        { name: "丽水", value: 133 },
        { name: "洛阳", value: 134 },
        { name: "秦皇岛", value: 136 },
        { name: "株洲", value: 143 },
        { name: "石家庄", value: 147 },
        { name: "莱芜", value: 148 },
        { name: "常德", value: 152 },
        { name: "保定", value: 153 },
        { name: "湘潭", value: 154 },
        { name: "金华", value: 157 },
        { name: "岳阳", value: 169 },
        { name: "长沙", value: 175 },
        { name: "衢州", value: 177 },
        { name: "廊坊", value: 193 },
        { name: "菏泽", value: 194 },
        { name: "合肥", value: 229 },
        { name: "武汉", value: 273 },
        { name: "大庆", value: 279 }
      ];
      /*获取地图数据*/
      myChart.showLoading();
      var mapFeatures = echarts.getMap(mapName).geoJson.features;
      myChart.hideLoading();
      mapFeatures.forEach(function(v) {
        // 地区名称
        var name = v.properties.name;
        // 地区经纬度
        geoCoordMap[name] = v.properties.cp;
      });

      // console.log(data);
      // console.log(toolTipData);
      var max = 480,
        min = 9; // todo
      var maxSize4Pin = 100,
        minSize4Pin = 20;
      var convertData = function(data) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
          var geoCoord = geoCoordMap[data[i].name];
          if (geoCoord) {
            res.push({
              name: data[i].name,
              value: geoCoord.concat(data[i].value)
            });
          }
        }
        return res;
      };

      var option = {
        // backgroundColor: '#404a59',
        /***  title: {
        text: '实时行驶车辆',
        subtext: 'data from PM25.in',
        sublink: 'http://www.pm25.in',
        left: 'center',
        textStyle: {
            color: '#fff'
        }
                  },**/
        title: {
          top: 10,
          text: "",
          left: "center",
          textStyle: {
            color: "#fff"
          }
        },
        tooltip: {
          padding: 0,
          enterable: true,
          transitionDuration: 1,
          textStyle: {
            color: "#000",
            decoration: "none"
          },
          trigger: "item",
          formatter: function(params) {
            // console.log(params)
            var tipHtml = "";
            tipHtml =
              '<div style="width:280px;height:150px;background:rgba(22,80,158,0.8);border:1px solid rgba(7,166,255,0.7)">' +
              '<div style="width:100%;height:40px;line-height:40px;border-bottom:2px solid rgba(7,166,255,0.7);padding:0 20px">' +
              '<i style="display:inline-block;width:8px;height:8px;background:#16d6ff;border-radius:40px;">' +
              "</i>" +
              '<span style="margin-left:10px;color:#fff;font-size:16px;">' +
              params.name +
              "</span>" +
              "</div>" +
              '<div style="padding:20px">' +
              '<p style="color:#fff;font-size:12px;">' +
              '<i style="display:inline-block;width:10px;height:10px;background:#16d6ff;border-radius:40px;margin:0 8px">' +
              "</i>" +
              "总人数：" +
              '<span style="color:#11ee7d;margin:0 6px;">' +
              params.value[2] +
              "</span>" +
              "个" +
              "</p>" +
              '<p style="color:#fff;font-size:12px;">' +
              '<i style="display:inline-block;width:10px;height:10px;background:#00c94b;border-radius:40px;margin:0 8px">' +
              "</i>" +
              "在线人数：" +
              '<span style="color:#f48225;margin:0 6px;">' +
              params.value[2] +
              "</span>" +
              "个" +
              "</p>" +
              "</div>" +
              "</div>";
            // setTimeout(function() {
            //   tooltipCharts(params.name);
            // }, 10);
            return tipHtml;
          }
        },

        geo: {
          show: true,
          map: mapName,
          aspectScale: 0.75,
          layoutCenter: ["50%", "51.5%"], //地图位置
          layoutSize: "118%",
          label: {
            emphasis: {
              show: false
            },
            normal: {
              show: false
            }
          },
          // roam: false, //禁止其放大缩小
          itemStyle: {
            normal: {
              areaColor: "#4c60ff",
              borderColor: "#002097"
            },
            emphasis: {
              areaColor: "#293fff"
            }
          },
          z: 2
        },
        series: [
          {
            name: "行政区内人数",
            type: "scatter",
            coordinateSystem: "geo",
            data: convertData(data),
            symbolSize: function(val) {
              return val[2] / 10;
            },
            label: {
              normal: {
                formatter: "{b}",
                position: "right",
                show: true
              },
              emphasis: {
                show: true
              }
            },
            aspectScale: 0.75,
            layoutCenter: ["50%", "50%"], //地图位置
            layoutSize: "118%",
            itemStyle: {
              normal: {
                color: "#ffeb7b"
              }
            }
          },
          {
            type: "map",
            map: mapName,
            geoIndex: 0,
            aspectScale: 0.75, //长宽比
            showLegendSymbol: false, // 存在legend时显示
            label: {
              normal: {
                show: true
              },
              emphasis: {
                show: false,
                textStyle: {
                  color: "#fff"
                }
              }
            },
            roam: true,
            itemStyle: {
              normal: {
                areaColor: "#031525",
                borderColor: "#3B5077"
              },
              emphasis: {
                areaColor: "#2B91B7"
              }
            },
            animation: false,
            data: data
          },
          {
            name: "点",
            type: "scatter",
            coordinateSystem: "geo",
            zlevel: 6
          }
          // {
          //     name: 'Top 5',
          //     type: 'effectScatter',
          //     coordinateSystem: 'geo',
          //     data: convertData(data.sort(function(a, b) {
          //         return b.value - a.value;
          //     }).slice(0, 10)),
          //     symbolSize: function(val) {
          //         return val[2] / 10;
          //     },
          //     showEffectOn: 'render',
          //     rippleEffect: {
          //         brushType: 'stroke'
          //     },
          //     hoverAnimation: true,
          //     label: {
          //         normal: {
          //             formatter: '{b}',
          //             position: 'left',
          //             show: false
          //         }
          //     },
          //     itemStyle: {
          //         normal: {
          //             color: 'yellow',
          //             shadowBlur: 10,
          //             shadowColor: 'yellow'
          //         }
          //     },
          //     zlevel: 1
          // },
        ]
      };
      var index = 0; //播放所在下标
      var showTip = setInterval(function() {
        myChart.dispatchAction({
          type: "showTip",
          seriesIndex: 0,
          dataIndex: index
        });
        index++;
        if (index >= option.series[0].data.length) {
          index = 0;
        }
      }, 2000);
      myChart.on("mouseover", function(params) {
        // console.log(params)
        clearInterval(showTip);
        myChart.dispatchAction({
          type: "showTip",
          seriesIndex: 0,
          dataIndex: params.dataIndex
        });
      });
      myChart.on("mouseout", function(params) {
        showTip && clearInterval(showTip);
        showTip = setInterval(function() {
          myChart.dispatchAction({
            type: "showTip",
            seriesIndex: 0,
            dataIndex: index
          });
          index++;
          if (index >= option.series[0].data.length) {
            index = 0;
          }
        }, 2000);
      });

      myChart.setOption(option);
      window.addEventListener("resize", function() {
        myChart.resize();
      });
           var chartDom1 = document.getElementById("bottom");
      var myChart1 = echarts.init(chartDom1);
    //       option = null;
    // // Generate data
    var category = [];
    var dottedBase = +new Date();
    dottedBase-=3600 * 24 * 1000*20;
    var lineData = [];
    var barData = [];
var b = [123,32,23,23,23,34,654,64,644,65,445,445,445,443,2,21,221,122,121,23]
var d = [64,56,755,432,423,43,65,34,65,23,12,32,43,12,43,54,23,54,23]
    for (var i = 0; i < 20; i++) {
        var date = new Date(dottedBase += 3600 * 24 * 1000);
        category.push([
            date.getFullYear(),
            date.getMonth() + 1,
            date.getDate()
        ].join('-'));
        // var b = 12;
        // var d = 34;
        lineData.push(b[i])
        barData.push(d[i] + b[i]);
    }


    // option
   var  option1 = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {
            data: ['处理数', '报警数'],
            textStyle: {
                color: '#ccc'
            }
        },
        xAxis: {
            data: category,
            axisLine: {
                lineStyle: {
                    color: '#ccc'
                }
            }
        },
        yAxis: {
            splitLine: {show: false},
            axisLine: {
                lineStyle: {
                    color: '#ccc'
                }
            }
        },
        series: [{
            name: 'line',
            type: 'line',
            smooth: true,
            showAllSymbol: true,
            symbol: 'emptyCircle',
            symbolSize: 15,
            data: lineData
        }, {
            name: '报警数',
            type: 'bar',
            barWidth: 10,
            itemStyle: {
                normal: {
                    barBorderRadius: 5,
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                            {offset: 0, color: '#14c8d4'},
                            {offset: 1, color: '#43eec6'}
                        ]
                    )
                }
            },
            data: barData
        }, {
            name: '处理数',
            type: 'bar',
            barGap: '-100%',
            barWidth: 10,
            itemStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                            {offset: 0, color: 'rgba(20,200,212,0.5)'},
                            {offset: 0.2, color: 'rgba(20,200,212,0.2)'},
                            {offset: 1, color: 'rgba(20,200,212,0)'}
                        ]
                    )
                }
            },
            z: -12,
            data: lineData
        }, {
            name: 'dotted',
            type: 'pictorialBar',
            symbol: 'rect',
            itemStyle: {
                normal: {
                    color: '#0f375f'
                }
            },
            symbolRepeat: true,
            symbolSize: [12, 4],
            symbolMargin: 1,
            z: -10,
            data: lineData
        }]
    };
    myChart1.setOption(option1);
      window.addEventListener("resize", function() {
        myChart1.resize();
      });
        // option1 && myChart1.setOption(option1);
    }
  }
};
</script>
<style lang="scss" scoped>
.layout {
  padding: 20px;
  height: 100%;
  background-color: #fff;
  z-index: 1;
  background: url("../img/bg.jpg") no-repeat center center;
  .titlePart {
    height: 90px;
    background: url("../img/header-bg.png") no-repeat center center;
    background-size: 100% 100%;
    border-color: #7187ac;
    .title-info {
      height: 2em;
      color: #03c2ec;
      text-align: center;
      font-size: 24px;
      font-family: "cuhei";
      font-weight: 600;
      line-height: 2em;
      vertical-align: middle;
    }

    .analysis-filter {
      height: 40.5px;
      line-height: 40.5px;
      color: #fff;
      font-size: 18px;
      font-weight: bold;
      float: right;
      margin-right: 50px;
    }
  }

  .content {
    margin-bottom: 10px;
    width: 100%;
    height: calc(100vh - 100px);

    .left {
      height: calc(100vh - 120px);
      width: 98%;
      margin-left: 1%;
      margin: 10px 10px 20px 10px;
      border-radius: 8px;

      // background-color: #fff;

      // background-color: #181c41;
      backdrop-filter: blur(20px);
      box-shadow: 1px 1px 10px rgba(93, 93, 93, 0.5);
      // border-right: 1px solid #fff;
      border-radius: 15px;
      z-index: 5;
      color: #fff;
      .top {
        height: calc(100% - 360px);
      }
      .bottom {
        height: 330px;
        width: 100%;
        background: url("../img/footer-bg.png") no-repeat center center;
        .seamless-warp {
          height: 100%;
          width: 100%;
          overflow: hidden;
        }
        .cardList {
          height: 90px;
          width: 100%;
          text-align: left;
          /* background-color: rgb(204, 90, 90); */
        }
        .divider {
          margin-top: 5%;
          width: 80%;
          margin-left: 10%;
          height: 2px;
          padding: 0;
          margin: 0;
          background-color: rgb(24, 136, 93);
          font-family: "Kosugi Maru", sans-serif;
          background-image: linear-gradient(
            45deg,
            rgb(47, 56, 93),
            rgb(101, 120, 156),
            rgb(101, 120, 156),
            rgb(47, 56, 93)
          );
        }
      }
    }
    .map {
      position: relative;
      height: calc(100vh - 120px);
      z-index: 9;
      // background-color: #fff;
      .map1,
      .map2,
      .map3 {
        position: absolute;
        opacity: 0.3;
      }
      .map1 {
        width: 50%;
        z-index: 2;
        top: 7%;
        left: 14%;
        // animation: myfirst2 15s infinite linear;
      }
      .map2 {
        width: 50%;
        z-index: 3;
        top: 12%;
        left: 20%;
        // animation: myfirst2 15s infinite linear;
      }
      .map3 {
        width: 30%;
        height: 30%;
        z-index: 1;
        top: 15%;
        left: 23%;
      }

      #mapBody {
        position: absolute;
        left: 0px;
        top: 0px;
        height: calc(100vh - 120px);
        width: 98%;
        margin-left: 1%;
        margin: 10px 10px 20px 10px;
        border-radius: 8px;
        //    background: url("../img/footer-bg.png") no-repeat center center;

        z-index: 7;
        // background-color: #fff;
      }
    }

    .right {
      height: calc(100vh - 120px);
      width: 93%;
      margin-left: 1%;
      margin: 10px 10px 20px 10px;
      border-radius: 8px;
      //    background: url("../img/footer-bg.png") no-repeat center center;
      background-color: transparent;
      backdrop-filter: blur(20px);
      // box-shadow: 3px 5px 10px rgba(93, 93, 93, 0.5);
      box-shadow: 1px 1px 10px rgba(93, 93, 93, 0.5);
      border-radius: 15px;
      z-index: 5;
      background: url("../img/footer-bg.png") no-repeat center bottom;
      .top {
        height: calc(100% - 360px);
        width: 100%;
                  .seamless-warp {
            height: 100%;
            width: 100%;
            overflow: hidden;
          }
          .cardList {
            height: 80px;
            width: 100%;
            text-align: left;
            /* background-color: rgb(204, 90, 90); */
          }
      }
      #bottom {
        margin-top: 100px;
        height: 280px;
        width: 100%;
      }
    }
  }
}
@keyframes myfirst2 {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes myfirst {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(-360deg);
  }
}
</style>
















