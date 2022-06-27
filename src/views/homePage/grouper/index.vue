<template>
  <div class="layout">
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
          <!-- <el-tooltip
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
          </el-tooltip>-->
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
      <div class="upper">
        <el-row type="flex" justify :gutter="20">
          <el-col :span="6">
            <el-row type="flex" justify>
              <el-col :span="24">
                <div
                  class="statistics"
                  v-loading="loading1"
                  element-loading-text="数据加载中"
                  element-loading-spinner="el-icon-loading"
                  element-loading-background="#222749"
                >
                  <div class="col-info">
                    <div class="title">信息总览</div>
                    <div class="detail" style="margin-top: 30px;">
                      <el-row type="flex" justify>
                        <el-col :span="8" style="text-align: center;">
                          <svg
                            t="1654350369181"
                            class="icon"
                            viewBox="0 0 1024 1024"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            p-id="4171"
                            width="50"
                            height="50"
                          >
                            <path
                              d="M652 258.8L632.7 87.5c-1.3-11.6-11.1-20.4-22.9-20.4H414.2c-11.7 0-21.5 8.8-22.9 20.4L372 258.8c-38.5 36.9-62.5 88.7-62.5 146.1v216.3c0 57.5 24.1 109.5 62.7 146.4l19 168.9c1.3 11.6 11.1 20.4 22.9 20.4h195.6c11.7 0 21.5-8.8 22.9-20.4l19-169c38.6-36.9 62.7-88.9 62.7-146.4V404.9c0.1-57.4-23.9-109.3-62.3-146.1zM429.4 107.1h165.2l13.5 119.7c-28.6-15.5-61.3-24.3-96.1-24.3s-67.5 8.8-96.1 24.3l13.5-119.7z m165.2 809.8H429.4l-13.2-117.5c28.5 15.4 61.2 24.2 95.8 24.2s67.3-8.8 95.8-24.2l-13.2 117.5z m79.8-295.7c0 89.6-72.9 162.4-162.4 162.4s-162.4-72.9-162.4-162.4V404.9c0-89.6 72.9-162.4 162.4-162.4s162.4 72.9 162.4 162.4v216.3z"
                              fill="#b188d4"
                              p-id="4172"
                            />
                            <path
                              d="M512 356.4m-45 0a45 45 0 1 0 90 0 45 45 0 1 0-90 0Z"
                              fill="#b188d4"
                              p-id="4173"
                            />
                            <path
                              d="M512 513m-45 0a45 45 0 1 0 90 0 45 45 0 1 0-90 0Z"
                              fill="#b188d4"
                              p-id="4174"
                            />
                            <path
                              d="M512 669.6m-45 0a45 45 0 1 0 90 0 45 45 0 1 0-90 0Z"
                              fill="#b188d4"
                              p-id="4175"
                            />
                          </svg>
                          <p style="	color: #00A8FE;font-size: 25px;font-weight: 600;">{{totalNum}}</p>
                          <p
                            style="font-size: 14px;color: #fff;height: 20px; margin-top: -12px;font-weight: 500"
                          >组用户数</p>
                        </el-col>
                        <el-col :span="8" style="text-align: center;">
                          <svg
                            t="1654350563156"
                            class="icon"
                            viewBox="0 0 1024 1024"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            p-id="5188"
                            width="50"
                            height="50"
                          >
                            <path
                              d="M980.864 584.96a473.696 473.696 0 0 1-395.936 400.928v36.608H439.04V985.92A473.664 473.664 0 0 1 43.136 584.864h-41.6v-145.76h43.328A473.92 473.92 0 0 1 439.072 50.176V1.504h145.888v48.768A474.016 474.016 0 0 1 979.168 439.04h43.328v145.92h-41.632zM475.552 977.216h72.96v-72.928h-72.96v72.928z m-428.8-501.664v72.928h72.96v-72.928h-72.96z m501.76-428.768h-72.96v72.928h72.96V46.784z m33.152 77.152v40.032h-139.328v-40a400.64 400.64 0 0 0-323.68 318.656h45.024v139.328H116.768a400.416 400.416 0 0 0 325.568 330.208v-51.584h139.328v51.584a400.416 400.416 0 0 0 325.568-330.208h-46.912v-139.328h45.088a400.864 400.864 0 0 0-323.744-318.656v-0.032z m395.584 351.616h-72.992v72.928h72.992v-72.928z"
                              p-id="5189"
                              fill="#39c6f3"
                            />
                            <path
                              d="M285.12 512a226.88 226.88 0 1 0 453.792 0A226.88 226.88 0 0 0 285.12 512"
                              p-id="5190"
                              fill="#39c6f3"
                            />
                          </svg>
                          <p style="	color: #00A8FE;font-size: 25px;font-weight: 600;">{{fenceNum}}</p>
                          <p
                            style="font-size: 14px;color: #fff;height: 20px; margin-top: -12px;font-weight: 500"
                          >电子围栏数</p>
                        </el-col>
                        <el-col :span="8" style="text-align: center;">
                          <svg
                            t="1653899360629"
                            class="icon"
                            viewBox="0 0 1024 1024"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            p-id="5581"
                            width="50"
                            height="50"
                          >
                            <path
                              d="M1002.666667 597.333333v42.666667a85.333333 85.333333 0 0 1-85.333334 85.333333H106.666667a85.333333 85.333333 0 0 1-85.333334-85.333333V128a85.333333 85.333333 0 0 1 85.333334-85.333333h810.666666a85.333333 85.333333 0 0 1 85.333334 85.333333z"
                              fill="#FED049"
                              p-id="5582"
                            />
                            <path
                              d="M128 490.666667h768v106.666666H128z"
                              fill="#F6B445"
                              p-id="5583"
                            />
                            <path
                              d="M725.333333 170.666667m21.333334 0l128 0q21.333333 0 21.333333 21.333333l0 42.666667q0 21.333333-21.333333 21.333333l-128 0q-21.333333 0-21.333334-21.333333l0-42.666667q0-21.333333 21.333334-21.333333Z"
                              fill="#D0D7DF"
                              p-id="5584"
                            />
                            <path
                              d="M192 213.333333m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z"
                              fill="#D0D7DF"
                              p-id="5585"
                            />
                            <path
                              d="M682.666667 661.333333m-320 0a320 320 0 1 0 640 0 320 320 0 1 0-640 0Z"
                              fill="#35DC86"
                              p-id="5586"
                            />
                            <path
                              d="M917.333333 21.333333H106.666667a106.794667 106.794667 0 0 0-106.666667 106.666667v512a106.794667 106.794667 0 0 0 106.666667 106.666667h170.666666a21.333333 21.333333 0 0 0 0-42.666667H106.666667a64 64 0 0 1-64-64V128a64 64 0 0 1 64-64h810.666666a64 64 0 0 1 64 64v533.333333a298.666667 298.666667 0 1 1-74.666666-197.568 21.333333 21.333333 0 0 0 32-28.224A341.333333 341.333333 0 1 0 1024 661.333333V128a106.794667 106.794667 0 0 0-106.666667-106.666667z"
                              fill="#474C54"
                              p-id="5587"
                            />
                            <path
                              d="M128 618.666667h128a21.333333 21.333333 0 0 0 0-42.666667H128a21.333333 21.333333 0 0 0 0 42.666667zM192 298.666667a85.333333 85.333333 0 1 0-85.333333-85.333334 85.333333 85.333333 0 0 0 85.333333 85.333334z m0-128a42.666667 42.666667 0 1 1-42.666667 42.666666 42.666667 42.666667 0 0 1 42.666667-42.666666zM874.666667 277.333333a42.666667 42.666667 0 0 0 42.666666-42.666666V192a42.666667 42.666667 0 0 0-42.666666-42.666667h-128a42.666667 42.666667 0 0 0-42.666667 42.666667v42.666667a42.666667 42.666667 0 0 0 42.666667 42.666666z m-128-85.333333h128v42.666667h-128zM128 512h64a21.333333 21.333333 0 0 0 0-42.666667H128a21.333333 21.333333 0 0 0 0 42.666667zM298.666667 469.333333h-21.333334a21.333333 21.333333 0 0 0 0 42.666667h21.333334a21.333333 21.333333 0 0 0 0-42.666667zM838.250667 539.584L618.666667 759.168l-70.250667-70.250667a21.333333 21.333333 0 0 0-30.165333 30.165334l85.333333 85.333333a21.333333 21.333333 0 0 0 30.165333 0l234.666667-234.666667a21.333333 21.333333 0 0 0-30.165333-30.165333z"
                              fill="#474C54"
                              p-id="5588"
                            />
                          </svg>
                          <p
                            style="color: #00A8FE;font-size: 25px;font-weight: 600;"
                          >{{activateNum}}</p>
                          <p
                            style="font-size: 14px;color: #fff;height: 20px; margin-top: -12px;font-weight: 500"
                          >已激活</p>
                        </el-col>
                        <el-col :span="8" style="text-align: center;">
                          <svg
                            t="1653910818186"
                            class="icon"
                            viewBox="0 0 1024 1024"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            p-id="8365"
                            data-spm-anchor-id="a313x.7781069.0.i28"
                            width="50"
                            height="50"
                          >
                            <path
                              d="M952 318.494H73.6c-27.2 59.2-41.6 124.8-41.6 193.6s14.4 134.4 41.6 193.6h876.8c27.2-59.2 41.6-124.8 41.6-193.6s-14.4-134.4-40-193.6z"
                              fill="#9DE8F7"
                              p-id="8366"
                              data-spm-anchor-id="a313x.7781069.0.i30"
                              class
                            />
                            <path
                              d="M1024 512.094c0-283.2-228.8-512-512-512s-512 228.8-512 512c0 249.6 179.2 457.6 416 502.4l0.032 0.032c13.376 2.56 32.48 5.776 53.024 7.712 11.36 0.912 22.8 1.456 34.272 1.664 1.536 0 3.072 0.016 4.592-0.016 38.784-0.784 89.44-9.248 105.36-12.064C847.44 966.494 1024 759.822 1024 512.094z m-88-225.6h-78.4c-48-104-118.4-177.6-174.4-222.4 108.8 41.6 198.4 121.6 252.8 222.4z m-342.4-248c14.4 8 152 89.6 228.8 248h-180.8c-28.8-120-72-211.2-94.4-252.8 16 1.6 32 3.2 46.4 4.8z m16 248H416c32-129.6 80-222.4 96-251.2 16 28.8 64 121.6 97.6 251.2z m-132.8-252.8c-22.4 41.6-65.6 132.8-94.4 252.8h-180.8c76.8-158.4 216-240 228.8-248 14.4-1.6 30.4-3.2 46.4-4.8z m-136 30.4c-54.4 44.8-126.4 118.4-172.8 222.4H88c54.4-100.8 144-180.8 252.8-222.4z m-308.8 448c0-68.8 14.4-134.4 41.6-193.6H952c25.6 59.2 40 124.8 40 193.6s-14.4 134.4-41.6 193.6H73.6c-27.2-59.2-41.6-124.8-41.6-193.6z m56 225.6h76.8c46.4 102.4 115.2 176 171.2 220.8-105.6-41.6-193.6-121.6-248-220.8z m337.6 246.4c-28.8-17.6-153.6-97.6-225.6-246.4h176c19.2 83.2 51.2 168 100.8 252.8-16-1.6-33.6-3.2-51.2-6.4z m-16-246.4h204.8c-19.2 81.6-52.8 164.8-102.4 248-49.6-84.8-83.2-168-102.4-248z m136 252.8c49.6-84.8 81.6-171.2 100.8-252.8h176c-70.4 148.8-196.8 230.4-224 246.4-17.6 3.2-35.2 4.8-52.8 6.4z m142.4-32c54.4-46.4 124.8-118.4 171.2-220.8H936c-54.4 99.2-142.4 179.2-248 220.8z"
                              fill="#5fb3ad"
                              p-id="8367"
                              data-spm-anchor-id="a313x.7781069.0.i29"
                              class="selected"
                            />
                            <path
                              d="M105.6 507.198c0-19.2 3.2-35.2 8-49.6 4.8-9.6 11.2-17.6 17.6-25.6 8-8 16-12.8 24-17.6 11.2-4.8 25.6-8 41.6-8 28.8 0 51.2 8 67.2 25.6 17.6 17.6 25.6 41.6 25.6 72s-8 54.4-25.6 72c-16 17.6-38.4 25.6-67.2 25.6s-51.2-8-67.2-25.6-24-38.4-24-68.8z m40-1.6c0 22.4 4.8 38.4 14.4 49.6 9.6 11.2 22.4 16 38.4 16s27.2-4.8 38.4-16c9.6-11.2 14.4-27.2 14.4-49.6 0-22.4-4.8-38.4-14.4-49.6s-22.4-16-38.4-16-28.8 4.8-38.4 16c-9.6 11.2-14.4 27.2-14.4 49.6zM446.4 601.598h-36.8v-70.4c0-14.4 0-24-1.6-28.8s-4.8-8-8-9.6c-3.2-3.2-8-3.2-12.8-3.2-6.4 0-12.8 1.6-17.6 4.8-4.8 3.2-8 8-9.6 14.4s-3.2 16-3.2 32v62.4H320v-137.6h33.6v20.8c12.8-16 27.2-24 44.8-24 8 0 16 1.6 22.4 4.8 6.4 3.2 11.2 6.4 14.4 11.2 3.2 4.8 6.4 9.6 6.4 16 1.6 6.4 1.6 14.4 1.6 24l3.2 83.2zM483.2 601.598v-192H520v190.4h-36.8v1.6zM556.8 444.798v-33.6h36.8v33.6h-36.8z m0 156.8v-137.6h36.8v137.6h-36.8zM756.8 601.598H720v-70.4c0-14.4 0-24-1.6-28.8s-4.8-8-8-9.6c-3.2-3.2-8-3.2-12.8-3.2-6.4 0-12.8 1.6-17.6 4.8-4.8 3.2-8 8-9.6 14.4s-3.2 16-3.2 32v62.4h-36.8v-137.6H664v20.8c12.8-16 27.2-24 44.8-24 8 0 16 1.6 22.4 4.8 6.4 3.2 11.2 6.4 14.4 11.2s6.4 9.6 6.4 16c1.6 6.4 1.6 14.4 1.6 24l3.2 83.2zM873.6 556.798l36.8 6.4c-4.8 12.8-12.8 24-22.4 30.4s-22.4 11.2-38.4 11.2c-24 0-41.6-8-52.8-24-9.6-12.8-14.4-28.8-14.4-48 0-22.4 6.4-41.6 17.6-54.4 11.2-12.8 27.2-19.2 44.8-19.2 20.8 0 36.8 6.4 48 20.8 11.2 12.8 17.6 33.6 17.6 62.4h-91.2c0 11.2 3.2 19.2 9.6 25.6s12.8 9.6 20.8 9.6c6.4 0 11.2-1.6 14.4-4.8s8-8 9.6-16z m3.2-36.8c0-11.2-3.2-19.2-8-24s-11.2-8-19.2-8-14.4 3.2-19.2 8c-4.8 6.4-8 14.4-8 24h54.4z"
                              fill
                              p-id="8368"
                            />
                          </svg>
                          <p style="color: #00A8FE;font-size: 25px;font-weight: 600;">{{onlineNum}}</p>
                          <p
                            style="font-size: 14px;color: #fff;height: 20px; margin-top: -12px;font-weight: 500"
                          >当前在线</p>
                        </el-col>
                      </el-row>
                    </div>
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row type="flex" justify>
              <el-col :span="24">
                <div class="alert">
                  <div class="col-info">
                    <div class="title" v-if="alertTitle">
                      <span>今日报警统计（{{alertInfo.length}}条）</span>
                      <span style="margin-left: 15px; line-height: 25px;">
                        <svg
                          @click="startSearch1"
                          style="float: right; margin-right: 15px; height: 30px; line-height: 30px;"
                          t="1655345322360"
                          class="icon"
                          viewBox="0 0 1024 1024"
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                          p-id="2143"
                          width="20"
                          height="20"
                        >
                          <path
                            d="M912.072815 946.738335c-4.78498 0-9.56996-1.824555-13.220093-5.475711L650.662083 693.076078c-0.285502-0.285502-0.561795-0.579191-0.827855-0.883113l-6.979972-7.948019c-6.671956-7.594979-6.096858-19.11843 1.297552-26.012444 32.130791-29.958312 57.424874-65.413825 75.181283-105.379049 18.374486-41.35692 27.691689-85.472674 27.691689-131.122363 0-86.355787-33.628912-167.542854-94.691639-228.604558-61.062727-61.062727-142.249795-94.691639-228.604558-94.691639s-167.541831 33.628912-228.604558 94.691639c-61.062727 61.062727-94.691639 142.249795-94.691639 228.604558s33.628912 167.542854 94.691639 228.604558c61.062727 61.062727 142.249795 94.691639 228.604558 94.691639 26.15059 0 52.16508-3.130294 77.326133-9.301853 5.090948-1.353834 73.4038-19.189038 120.842229-14.809287 10.282181 0.948605 17.847483 10.05296 16.899902 20.335141s-10.047844 17.853623-20.335141 16.899902c-41.659819-3.845585-107.272165 13.571087-107.930151 13.747095-0.125867 0.033769-0.251733 0.065492-0.3776 0.097214-28.132734 6.91755-57.20998 10.425444-86.425372 10.425444-48.684816 0-95.922676-9.538237-140.402727-28.352745-42.953278-18.166755-81.523735-44.172035-114.644063-77.290317-33.119305-33.119305-59.123562-71.691809-77.29134-114.644063-18.813484-44.479027-28.352745-91.716888-28.352745-140.401704s9.53926-95.922676 28.352745-140.402727c18.167778-42.953278 44.172035-81.524758 77.29134-114.644063 33.119305-33.119305 71.690786-59.123562 114.644063-77.29134 44.480051-18.813484 91.717911-28.352745 140.402727-28.352745s95.922676 9.53926 140.401704 28.352745c42.953278 18.167778 81.524758 44.173059 114.644063 77.29134 33.118282 33.119305 59.123562 71.690786 77.29134 114.644063 18.813484 44.480051 28.351722 91.717911 28.351722 140.402727 0 50.912553-10.399861 100.136651-30.91101 146.305157-17.285688 38.906102-40.96704 73.973782-70.526263 104.47547l242.313791 242.310721c7.302313 7.30129 7.302313 19.138896 0.001023 26.440186C921.642774 944.912757 916.857794 946.738335 912.072815 946.738335z"
                            p-id="2144"
                            fill="#e6e6e6"
                          />
                          <path
                            d="M165.576059 421.887656c-0.696872 0-1.400906-0.038886-2.110057-0.118704-10.260691-1.152243-17.645892-10.404977-16.493649-20.666692 4.838192-43.080168 17.974373-83.934644 39.046295-121.429607 5.058203-9.002025 16.457834-12.19781 25.458835-7.139607 9.002025 5.058203 12.19781 16.45681 7.139607 25.458835-18.605753 33.108049-30.207999 69.202105-34.484396 107.282399C183.060269 414.827867 174.967964 421.887656 165.576059 421.887656z"
                            p-id="2145"
                            fill="#e6e6e6"
                          />
                        </svg>
                      </span>
                    </div>
                    <div class = "title" v-if="!alertTitle" style="height: 40px; line-height: 40px;">
                      <input
                        @input="inputChange1"
                        class="input"
                        v-model="alertSearch"
                        placeholder="请输入手环名搜索"
                      />
                      <svg
                        @click="change1"
                        style="margin-top: 2px; margin-left: 10px;"
                        t="1655345531987"
                        class="icon"
                        viewBox="0 0 1024 1024"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        p-id="2622"
                        width="20"
                        height="20"
                      >
                        <path
                          d="M512 0C230.4 0 0 230.4 0 512c0 281.6 230.4 512 512 512 281.6 0 512-230.4 512-512C1024 230.4 793.6 0 512 0zM512 985.6c-262.4 0-473.6-211.2-473.6-473.6 0-262.4 211.2-473.6 473.6-473.6 262.4 0 473.6 211.2 473.6 473.6C985.6 774.4 774.4 985.6 512 985.6zM768 256c-6.4-6.4-19.2-6.4-25.6 0L512 486.4 288 256C281.6 249.6 268.8 249.6 256 256 249.6 268.8 249.6 281.6 256 288L486.4 512 256 736c-6.4 6.4-6.4 19.2 0 25.6 6.4 6.4 6.4 6.4 12.8 6.4 6.4 0 12.8 0 12.8-6.4L512 537.6l224 224c6.4 6.4 6.4 6.4 12.8 6.4 6.4 0 12.8 0 12.8-6.4 6.4-6.4 6.4-19.2 0-25.6L537.6 512 768 288C774.4 281.6 774.4 268.8 768 256z"
                          p-id="2623"
                          fill="#8a8a8a"
                        />
                      </svg>
                    </div>
        <div class="bottom" v-if="alertShow">
              <vue-seamless-scroll :data="data1" class="seamless-warp">
                <div class="cardList" v-for="(item,index) in data1" :key="index">
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
            <div v-if="!alertShow" style="text-align: center;">
              <svg
                style="margin-top: 30px;"
                t="1655342118838"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="3619"
                width="120"
                height="120"
              >
                <path
                  d="M1022.976 558.976a463.808 463.808 0 0 1-463.872 463.872H464.896A463.808 463.808 0 0 1 1.024 558.976V464.96A463.872 463.872 0 0 1 464.896 1.088h94.208a463.936 463.936 0 0 1 463.872 463.872v94.016z"
                  fill="#42BAA8"
                  p-id="3620"
                />
                <path d="M628.096 176H256v661.824h512V315.328z" fill="#FCFCFD" p-id="3621" />
                <path d="M628.096 315.328H768L628.096 176z" fill="#F1F3F7" p-id="3622" />
                <path
                  d="M419.072 446.528H316.416V343.808h102.656v102.72z m-84.096-18.56h65.6V362.368H334.976v65.6z"
                  fill="#42BAA8"
                  p-id="3623"
                />
                <path
                  d="M461.504 351.936h246.144v24.384H461.504zM461.504 414.016h180.48v24.384h-180.48z"
                  fill="#42BAA8"
                  p-id="3624"
                />
                <path
                  d="M419.072 615.424H316.416V512.704h102.656v102.72z m-84.096-18.496h65.6V531.328H334.976v65.6z"
                  fill="#42BAA8"
                  p-id="3625"
                />
                <path
                  d="M461.504 520.832h246.144v24.384H461.504zM461.504 582.848h180.48v24.448h-180.48z"
                  fill="#42BAA8"
                  p-id="3626"
                />
                <path
                  d="M419.072 784.448H316.416v-102.656h102.656v102.656z m-84.096-18.624h65.6V700.16H334.976v65.664z"
                  fill="#42BAA8"
                  p-id="3627"
                />
                <path
                  d="M461.504 689.28h246.144v24.384H461.504zM461.504 751.296h180.48v24.384h-180.48z"
                  fill="#42BAA8"
                  p-id="3628"
                />
                <path
                  d="M339.008 379.776l30.208 42.368 66.176-74.88-66.816 57.472z"
                  fill="#F0582F"
                  p-id="3629"
                />
              </svg>
              <p style="color: #31baa8">今日暂无报警</p>
            </div>
                  </div>
                </div>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="12">
            <div id="mapBody1">
              <!-- <div id="body2"></div> -->
            </div>
          </el-col>
          <el-col :span="6">
            <div class="ringMessage">
              <div class="title">
                <span>已激活手环数据详情</span>

                <span style="margin-left: 15px; margin-top: 10px;">
                    <svg
                    @click = "allProduct"
                      t="1654419730805"
                      class="icon"
                      viewBox="0 0 1024 1024"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      p-id="2110"
                      width="16"
                      height="16"
                    >
                      <path
                        d="M182.044444 256m-28.444444 0a28.444444 28.444444 0 1 0 56.888889 0 28.444444 28.444444 0 1 0-56.888889 0Z"
                        fill="#00c1ea"
                        p-id="2111"
                      />
                      <path
                        d="M182.044444 199.111111c-34.133333 0-56.888889 22.755556-56.888888 56.888889s22.755556 56.888889 56.888888 56.888889 56.888889-22.755556 56.888889-56.888889-22.755556-56.888889-56.888889-56.888889z"
                        fill="#00c1ea"
                        p-id="2112"
                      />
                      <path
                        d="M182.044444 512m-28.444444 0a28.444444 28.444444 0 1 0 56.888889 0 28.444444 28.444444 0 1 0-56.888889 0Z"
                        fill="#00c1ea"
                        p-id="2113"
                      />
                      <path
                        d="M182.044444 455.111111c-34.133333 0-56.888889 22.755556-56.888888 56.888889s22.755556 56.888889 56.888888 56.888889 56.888889-22.755556 56.888889-56.888889-22.755556-56.888889-56.888889-56.888889z"
                        fill="#00c1ea"
                        p-id="2114"
                      />
                      <path
                        d="M182.044444 768m-28.444444 0a28.444444 28.444444 0 1 0 56.888889 0 28.444444 28.444444 0 1 0-56.888889 0Z"
                        fill="#00c1ea"
                        p-id="2115"
                      />
                      <path
                        d="M182.044444 711.111111c-34.133333 0-56.888889 22.755556-56.888888 56.888889s22.755556 56.888889 56.888888 56.888889 56.888889-22.755556 56.888889-56.888889-22.755556-56.888889-56.888889-56.888889z"
                        fill="#00c1ea"
                        p-id="2116"
                      />
                      <path d="M381.155556 256h512" fill="#00c1ea" p-id="2117" />
                      <path
                        d="M893.155556 284.444444h-512c-17.066667 0-28.444444-11.377778-28.444445-28.444444s11.377778-28.444444 28.444445-28.444444h512c17.066667 0 28.444444 11.377778 28.444444 28.444444s-17.066667 28.444444-28.444444 28.444444z"
                        fill="#00c1ea"
                        p-id="2118"
                      />
                      <path d="M381.155556 512h512" fill="#00c1ea" p-id="2119" />
                      <path
                        d="M893.155556 540.444444h-512c-17.066667 0-28.444444-11.377778-28.444445-28.444444s11.377778-28.444444 28.444445-28.444444h512c17.066667 0 28.444444 11.377778 28.444444 28.444444s-17.066667 28.444444-28.444444 28.444444z"
                        fill="#00c1ea"
                        p-id="2120"
                      />
                      <path d="M381.155556 768h512" fill="#00c1ea" p-id="2121" />
                      <path
                        d="M893.155556 796.444444h-512c-17.066667 0-28.444444-11.377778-28.444445-28.444444s11.377778-28.444444 28.444445-28.444444h512c17.066667 0 28.444444 11.377778 28.444444 28.444444s-17.066667 28.444444-28.444444 28.444444z"
                        fill="#00c1ea"
                        p-id="2122"
                      />
                    </svg>
                 
                </span>
              </div>
              <div class="content">
                <el-carousel indicator-position="outside" height="45vh">
                  <el-carousel-item v-for="(item,index) in carouselData" :key="index">
                    <div v-for="(item1,index1) in item" :key="index1" style="height: 45%;">
                      <p
                        style="color: #fff; font-size: 20px; font-weight: bold;margin-left: 30px; "
                      >
                        <span
                          class="index0"
                          v-if="index1 == 0"
                          style="position: absolute;top: 30px;"
                        >{{index*2+index1+1}}</span>
                        <span class="index1" v-if="index1 == 1">{{index*2+index1+1}}</span>

                        <span
                          style="font-size: 20px;
	                                    font-weight: 600;
	                                            color: rgba(255, 255, 255, 1);
                                   margin-left: 40px;
                                    line-height: 40px;"
                        >{{item1.productName}}</span>
                        <span style="margin-left: 20px;">
                          <el-tag
                            effect="dark"
                            size="mini"
                            :type="
                                   item1.extraInfo.status == '在线'
                                ? 'success'
                                : 'danger'
                                "
                            disable-transitions
                          >{{item1.extraInfo.status}}</el-tag>
                        </span>
 
                      </p>

                      <el-row
                        type="flex"
                        justify="start"
                        :gutter="20"
                        style="width: 94%; margin-left: 3%;"
                      >
                        <el-col :span="8" class="card">
                          <span style="color: #fff;font-size: 15px">温度</span>
                          <br />
                          <span
                            style="color:#00A8FE;font-size:18px;font-weight:600;"
                          >{{item1.latestData.body}}</span>
                        </el-col>
                        <!-- <el-col :span="8" class="card">
                          <p style="color: #fff;font-size: 14px">腕温</p>
                          <p style="color: #00a6fb; font-size:18px; ">{{item1.latestData.skin}}</p>
                        </el-col>-->
                        <el-col :span="8" class="card">
                          <span style="color: #fff;font-size: 15px">心率</span>
                          <br />
                          <span
                            style="color:#00A8FE;font-size:18px;font-weight:600;"
                          >{{item1.latestData.heartRate}}</span>
                        </el-col>
                        <!-- <el-col :span="8" class="card">
                          <span style="color: #fff;font-size: 15px">电子围栏</span>
                          <br />
                          <span
                            style="color:#00A8FE;font-size:18px;font-weight:600;"
                          >{{item1.extraInfo.fence}}</span>
                        </el-col>-->
                        <el-col :span="8" class="card">
                          <span style="color: #fff;font-size: 15px">步数</span>
                          <br />
                          <span
                            style="color:#00A8FE;font-size:18px;font-weight:600;"
                          >{{item1.latestData.stepNum}}</span>
                        </el-col>
                      </el-row>
                      <p style="margin-left:30px;">
                        <span style="color: #fff; font-size: 14px;margin-left: 20px;">| 当前所在城市：</span>
                        <span style="color: #df964e;">{{item1.latestData.location.city}}</span>
                        <!-- <span style="color: #fff; font-size: 14px;margin-left: 30px;">| 位置状态：</span> -->
                        <!-- <span style="color: #df964e;" v-if="item1.latestData.ifIn == 'in'">在其电子围栏内</span>
                        <span style="color: #df964e;" v-if="item1.latestData.ifIn == 'out'">不在其电子围栏内</span>
                        <span style="color: #df964e;" v-if="item1.latestData.ifIn == '-'">未知</span>-->
                      </p>

                      <!-- <el-divider v-if = "index1 == 0" style = "font-size: 2px;"></el-divider>  -->
                      <p
                        class="divider"
                        style="margin-left: 10%; margin-top: 30px;"
                        v-if="index1 == 0"
                      ></p>
                    </div>
                  </el-carousel-item>
                </el-carousel>
              </div>
            </div>
          </el-col>
        </el-row>
        <div class="downer">
          <el-row type="flex" justify :gutter="20">
            <el-col :span="12">
              <div class="ranking">
                <div class="title">
                  各手环报警数
                </div>
                <div id="ranking"></div>
              </div>
            </el-col>

            <el-col :span="12">
              <div class="statistics">
                <div class="title">最新温度心率统计</div>
                <div id="heartRate">
                  <chartsData />
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
    <!-- <el-button @click="skip">详情页</el-button> -->

<el-dialog
  title="小组用户信息"
  :visible.sync="dialogVisible"
  width="90%">
  <grouper/>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
</el-dialog>
<!-- <el-dialog
  title="小组用户信息"
  :visible.sync="dialogVisible1"
  width="90%">
  <detailPage/>
  <span slot="footer" class="dialog-footer">
    <el-button @click="cancel">取 消</el-button>
    <el-button type="primary" @click="cancel">确 定</el-button>
  </span>
</el-dialog> -->
  </div>
</template>


<script>
import grouper from "@/views/Product/grouper";
import {
  allProductKey,
  getDeviceDatas,
  subjectCount,
  alertbyTime
} from "@/api/index";
import { UserDetail } from "@/api/admin";
import * as echarts from "echarts";
import chartsData from "@/views/Home/chartsData";
import chartsData1 from "@/views/homePage/grouper/chartsData";
import detailPage from "@/views/Product/detailPage";

export default {
  name: "homepage",
  components: {
    chartsData,
    chartsData1,
    grouper,
    detailPage
  },
  data() {
    return {
      date: "",
      date1: "",
      productList1: [],
      fenceList: [],
      loading1: false,
      loading2: true,
      totalNum: "",
      activateNum: "",
      onlineNum: "",
      fenceNum: "",
      alertMessage: [],
      atestAlert: [],
      subjectCount: [],
      total: 0,
      carouselData: [],
      alertShow: false,
      center: { lng: 117.932682, lat: 31.194548 }, // 中心点坐标
      zoom: 5, // 缩放级别
      mapStyle: {
        style: "bluish"
      },
      map: null,
      // zoom: 12,
      alertInfo: [],
      length: 0,
      judge: [],
      productList2: [],
      fenceName: [],
      alertTitle: true,
      alertSearch: "",
      data1: null,
      alertStatistic:[],
      dialogVisible: false,
      dialogVisible1: false,
    };
  },
  created() {
    this.prepare();
  },
  mounted() {
    setInterval(this.timer, 1000);
    this.map = new BMap.Map("mapBody1", {
      enableMapClick: false,
      minZoom: 5,
      maxZoom: 20
    }); // 创建Map实例
    this.map.centerAndZoom(
      new BMap.Point(this.center.lng, this.center.lat),
      this.zoom
    ); // 初始化地图,用城市名设置地图中心点
    //   console.log(this.map)
    this.map.setMapStyle(this.mapStyle);
    // map.addControl(new BMap.MapTypeControl()); //添加地图类型控件
    // map.setCurrentCity("洛阳");   // 设置地图显示的城市 此项是必须设置的
    this.map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
  },
  //在vue实例销毁之前清除定时器
  beforeDestroy() {
    if (this.date) {
      clearInterval(this.timer);
    }
  },
  methods: {
    skip() {
      this.$router.push({ path: "/home" });
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
    prepare() {
      this.outAlert = [];
      this.productList1 = [];
      this.fenceList = [];

      var username = window.localStorage.getItem("username");
      console.log(username);
      UserDetail(username).then(res => {
        if (res.msg == "ok") {
          //   console.log(res);
          console.log(res);
          this.productNameList = [];
          var productKeys = [];
          this.productNameList.push({
            productName: username,
            productKey: res.data.extraInfo.groups[0].productKey
          });
          productKeys.push(res.data.extraInfo.groups[0].productKey);
          if (res.data.extraInfo.groups[0].users.length !== 0) {
            res.data.extraInfo.groups[0].users.forEach(item => {
              var obj = {
                productName: item.productName,
                productKey: item.productKey
              };
              this.productNameList.push(obj);
              productKeys.push(item.productKey);
            });
          }
          console.log(this.productNameList);
          console.log(productKeys);
          window.sessionStorage.setItem(
            "productNameList",
            JSON.stringify(this.productNameList)
          );
                   window.sessionStorage.setItem(
            "productKeys",
            JSON.stringify(productKeys)
          );
          // console.log(this.productNameList);

          getDeviceDatas({
            username: "admin",
            pkList: productKeys,
            startTime: 100000
          }).then(res => {
            // console.log(res);

            this.productList1 = res.data;
            this.fenceNum = 0;
            this.fenceName = [];

            this.productList1.forEach(item => {
              if (item.extraInfo.fence !== "-") {
                this.fenceName.push(item.extraInfo.fence);
              }
            });
            console.log(this.fenceName);
            var arr = this.fenceName;
            var newArr = arr.filter(function(item, index) {
              return arr.indexOf(item) === index; // 因为indexOf 只能查找到第一个
            });

            console.log(newArr);
            this.fenceNum = newArr.length;

            this.productList1.forEach(item => {
              // if (item.extraInfo.fence !== "-") {

              // }
              item.deviceName = [];
              item.latestData = {};
              if (item.deviceData !== null) {
                for (var i = 0; i < item.deviceData.length; i++) {
                  item.deviceName.push(item.deviceData[i].deviceName);
                }
                if (item.extraInfo.fence !== "-") {
                  if (this.fenceList.length !== 0 || this.fenceList !== null) {
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
                  item.latestData.fence = "-";
                }
                // console.log(item);
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
                    ].extraInfo.stepNum;
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
              } else {
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

              // console.log(item.deviceData.length)
            });
            console.log(this.productList1);
            this.productList1.forEach(item => {
              if (item.latestData.location !== "") {
                var marker = item.latestData.location.location;
                var array = marker.split(",");
                this.marker1 = new BMap.Point(array[0], array[1]);
                // 之前直接写 var polygon = new BMap.Polygon(item.latestData),返回的
                // 全部是不在围栏内
                //所以以下的数据处理是很是重要的
                var polArry = [];
                //   if (item.extraInfo.fence !== "-")  {
                // console.log( item.latestData)
                // if (item.latestData.fence!==undefined) {
                // item.latestData.fence.forEach(item1 => {
                //   var p = new BMap.Point(item1.lng, item1.lat);
                //   polArry.push(p);
                // });
                // }

                // var polygon = new BMap.Polygon(polArry);
                // console.log(polygon)
                // console.log(this.marker1)
                // if (BMapLib.GeoUtils.isPointInPolygon(this.marker1, polygon)) {
                //   console.log("目前在电子围栏");
                //   item.latestData.ifIn = "in";
                // } else {
                //   console.log("目前不在电子围栏内");
                //   this.outAlert.push(item);
                //   item.latestData.ifIn = "out";
                // }
              }
            });
            this.alertContent = "";
            if (this.outAlert.length !== 0) {
              for (var i = 0; i < this.outAlert.length; i++) {
                this.alertContent += this.outAlert[i].productName + " ";
              }
              this.alertContent += "不在其对应的电子围栏内";
              alert(this.alertContent);
            }
            this.totalNum = this.productList1.length;
            window.localStorage.setItem(
              "productList1",
              JSON.stringify(this.productList1)
            );

            this.judge = [];
            //处理productLIst1,目的是为了手环数据详情轮播图里面，两个手环放在一个轮播图里面
            this.productList2 = [];
            this.productList1.forEach(item => {
              var jud = {
                productName: item.productName,
                productKey: item.productKey
              };
              this.judge.push(jud);
              if (item.latestData.heart !== "-") {
                this.productList2.push(item);
              }
            });
            console.log(this.productList2);
            window.sessionStorage.setItem(
              "productList2",
              JSON.stringify(this.productList2)
            );

            var leng = 0;
            if (this.productList2.length % 2 == 0) {
              leng = this.productList2.length / 2;
            } else {
              leng = Math.floor(this.productList2.length / 2) + 1;
            }
            // console.log(leng)
            //   this.carouselData = new Array(leng).fill([{},{}]);
            //   console.log( this.carouselData[5][1])
            // console.log(this.productList1[4*2+1])
            // for (var i=0; i<leng;i++) {
            //     this.carouselData[i][0] = this.productList1[i*2]
            //     this.carouselData[i][1] = this.productList1[i*2+1]
            // }

            var list = [];
            this.carouselData = [];
            // list[1] = this.productList1[3*2+1]
            // console.log(list)
            if (this.productList2.length % 2 == 0) {
              for (var i = 0; i < leng; i++) {
                list = [];
                list.push(this.productList2[i * 2]);
                list.push(this.productList2[i * 2 + 1]);
                this.carouselData.push(list);
              }
            } else {
              for (var i = 0; i < leng - 1; i++) {
                list = [];
                list.push(this.productList2[i * 2]);
                list.push(this.productList2[i * 2 + 1]);
                this.carouselData.push(list);
              }
              list = [];
              list.push(this.productList2[this.productList2.length - 1]);
              this.carouselData.push(list);
            }

            console.log(this.carouselData);
            var unactivate = [];

            var online = [];
            this.date1 = Math.round(new Date().getTime() / 1000);
            // if (this.productList1.length !== 0) {
            //   this.productList1.forEach(item => {
            //     if (item.latestData.heart == "-") {
            //       unactivate.push(item);
            //     } else if (this.date1 - item.latestData.heart <= 7200) {
            //       online.push(item);
            //     } else {
            //       console.log("离线");
            //     }
            //   });
            if (this.productList2.length !== 0) {
              this.productList2.forEach(item => {
                if (
                  item.latestData.heart !== "-" ||
                  item.latestData.heart !== undefined
                ) {
                  //  console.log(item.latestData.heart)
                  if (this.date1 - item.latestData.heart <= 7200) {
                    item.extraInfo.status = "在线";
                    online.push(item);
                  } else if (this.date1 - item.latestData.heart > 7200) {
                    item.extraInfo.status = "离线";
                  }
                }
              });
              var positionList = [];
              // if (this.productList2[i].latestData.location !== "") {
              //   this.productList2[
              //     i
              //   ].latestData.location.productName = this.productList2[
              //     i
              //   ].productName;
              //   console.log(this.productList2[i].latestData.location);
              //   positionList.push(this.productList2[i].latestData.location);
              // }
              // console.log(this.productList2)
              var productList3 = [];
              this.productList2.forEach(item2 => {
                if (item2.deviceData !== undefined) {
                  productList3.push(item2);
                }
              });
              console.log(productList3);
              productList3.forEach(item => {
                item.latestData.location.productName = item.productName;
                item.latestData.location.status = item.extraInfo.status;
                positionList.push(item.latestData.location);
              });
            }

            console.log(positionList);
            var markerArr = [];
            positionList.forEach(item => {
              var obj = {
                title: item.productName,
                point: item.location,
                address: item.desc
              };
              markerArr.push(obj);
            });
            for (var i = 0; i < positionList.length; i++) {
              markerArr[i].point = positionList[i].location;
              markerArr[i].address = positionList[i].desc;
              markerArr[i].title = positionList[i].productName;
              markerArr[i].status = positionList[i].status;
            }
            console.log(markerArr);

            for (var i = 0; i < markerArr.length; i++) {
              //  console.log(markerArr)
              var p0 = markerArr[i].point.split(",")[0];
              var p1 = markerArr[i].point.split(",")[1];
              var maker = this.addMarker(
                new window.BMap.Point(p0, p1),
                markerArr[i]
              );
              this.addInfoWindow(maker, markerArr[i], i);
            }

            // }
            this.onlineNum = online.length;
            console.log(this.onlineNum);
            this.activateNum = productList3.length;
            console.log(this.activateNum);
            this.loading1 = false;

            //判断点是否在电子围栏内

            this.alertMessage = [];
            this.latestAlert = [];
            for (var i = 0; i < this.productList1.length; i++) {
              var obj = {
                productName: this.productList1[i].productName,
                alertData: []
              };
              //温度和心率报警
              this.date = Math.round(new Date().getTime() / 1000);
              // console.log(this.productList1[i].latestData.heart);
              if (this.productList1[i].latestData.heart !== "-") {
                // console.log(this.date - this.productList1[i].latestData.heart);
                if (this.date - this.productList1[i].latestData.heart <= 7200) {
                  // console.log("wer")
                  if (this.productList1[i].latestData.body !== "-") {
                    if (
                      this.productList1[i].latestData.body > 37 ||
                      this.productList1[i].latestData.body < 35
                    ) {
                      obj.alertData.push({ alert: "温度报警" });
                    }
                  }
                  if (this.productList1[i].latestData.heartRate !== "-") {
                    //  console.log(this.productList1)
                    if (
                      this.productList1[i].latestData.heartRate > 100 ||
                      this.productList1[i].latestData.heartRate < 60
                    ) {
                      obj.alertData.push({ alert: "心率报警" });
                    }
                  }
                }
              }
              this.alertMessage.push(obj);
            }
            // console.log(this.alertMessage);
            for (var i = 0; i < this.alertMessage.length; i++) {
              if (this.alertMessage[i].alertData.length != 0) {
                this.latestAlert.push(this.alertMessage[i]);
              }
            }
            // console.log(this.latestAlert);
          });
        } else {
          this.$message.error(res.msg);
        }
      });
      console.log(this.productList1);

      // var total = JSON.parse(window.sessionStorage.getItem("total"));
      var startTime = Math.floor(
        new Date(new Date().setHours(0, 0, 0, 0)).getTime() / 1000
      );
      var endTime = Math.floor(
        new Date(new Date().setHours(23, 59, 59, 999)).getTime() / 1000
      );
      this.alertInfo = [];
      // var obj = {
      //   startTime: startTime,
      //   endTime: endTime,
      //   asc: 1,
      //   num: 50
      // };
      // console.log(obj);
      //      var obj = {
      //   startTime: 1650297600,
      //   endTime: 1650383999,
      //   asc: 1,
      //   num:50
      // }
      var tokenForAdmin = window.sessionStorage.getItem("tokenForAdmin");
      // alertbyTime(obj).
      var _this = this;
      _this
        .axios({
          method: "post",
          url: "https://api.ahusmart.com/api/v1/userAlertInfos/byTime",
          headers: {
            token: tokenForAdmin
          },
          data: {
            startTime: startTime,
            endTime: endTime,
            asc: 1,
            num: 50
          }
        })
        .then(res => {
          console.log(res);
          if (res.data.msg == "未找到记录") {
            this.alertShow = false; //为了展示改动的地方
          } else if (res.data.msg == "ok") {
            this.alertShow = true;
            res.data.data.alertInfo.forEach(item => {
              this.alertInfo.push(item);
            });
          } else {
            this.$message.error(res.msg);
          }
          if (this.alertInfo.length !== 0) {
            console.log(this.alertInfo);
            var alertInfo1 = [];
            this.alertInfo.forEach(item => {
              this.productNameList.forEach(item1 => {
                if (item.productKey == item1.productKey) {
                  item.productName = item1.productName;
                  alertInfo1.push(item);
                }
              });
            });
            this.alertInfo = alertInfo1;
            if (this.alertInfo.length == 0) {
              this.alertShow = false;
            } else {
              this.alertShow = true;
              var value = 0
              this.alertStatistic = []
              this.productNameList.forEach(item=>{
                var obj = {
                  productName: item.productName,
                  value: 0
                }
                this.alertStatistic.push(obj)
              })
              console.log(this.productNameList)
               this.alertInfo.forEach(item=>{
                 this.alertStatistic.forEach(item1=>{
                   if (item1.productName == item.productName) {
item1.value+=1
                   }

                 })
                
               })
            }
            console.log(this.alertInfo);
            console.log(this.alertStatistic)
              this.echarts();
            this.data1 = this.alertInfo;
        
          }
          this.loading2 = false;
          console.log(this.judge);
          //从productKey得到productName
          this.length = this.alertInfo.length;
        });
      subjectCount().then(res => {
        console.log(res);
        if ((res.msg = "ok")) {
          this.subjectNum = res.data.subjectCount;
          this.total = res.data.total;
          window.localStorage.setItem(
            "subjectNum",
            JSON.stringify(this.subjectNum)
          );
          window.sessionStorage.setItem("total", JSON.stringify(this.total));
       
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    echarts() {
      console.log(this.alertStatistic)
      var chartDom = document.getElementById("ranking");
      var myChart = echarts.init(chartDom);
      var name = []
      var num = []
this.alertStatistic.forEach(item=>{
  name.push(item.productName)
  // console.log(item.value)
  num.push(item.value.toString())
})
console.log(name)
console.log(num)
      var option;
      option = {
        // backgroundColor: "#141f56",

        tooltip: {
          show: "true",
          trigger: "item",
          backgroundColor: "rgba(0,0,0,0.4)", // 背景
          padding: [8, 10], //内边距
          // extraCssText: 'box-shadow: 0 0 3px rgba(255, 255, 255, 0.4);', //添加阴影
          // formatter: function(params) {
          //   if (params.seriesName != "") {
          //     return params.name + " ：  " + params.value + " 条";
          //   }
          // }
        },
        grid: {
          borderWidth: 0,
          top: 20,
          bottom: 35,
          left: 55,
          right: 30,
          textStyle: {
            color: "#fff"
          }
        },
        xAxis: [
          {
            type: "category",

            axisTick: {
              show: false
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "#363e83"
              }
            },
            axisLabel: {
              inside: false,
              textStyle: {
                color: "#fff",
                fontWeight: "normal",
                fontSize: "11"
              }
            },
            data: name
          },
          {
            type: "category",
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: false
            },
            splitArea: {
              show: false
            },
            splitLine: {
              show: false
            },
            data: name
          }
        ],
        yAxis: {
          type: "value",
          axisTick: {
            show: false
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "#32346c"
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "#32346c "
            }
          },
          axisLabel: {
            textStyle: {
              color: "#bac0c0",
              fontWeight: "normal",
              fontSize: "12"
            },
            formatter: "{value}"
          }
        },
        series: [
          {
            // name: '生师比(%)',
            type: "bar",
            itemStyle: {
              normal: {
                show: true,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#0086fb"
                  },
                  {
                    offset: 1,
                    color: "#6565a6"
                  }
                ]),
                barBorderRadius: 20,
                borderWidth: 0
              },
              emphasis: {
                shadowBlur: 15,
                shadowColor: "rgba(105,123, 214, 0.7)"
              }
            },
            zlevel: 2,
            barWidth: "35%",
            data: num
          },
          {
            name: "",
            type: "bar",
            xAxisIndex: 1,
            zlevel: 1,
            itemStyle: {
              normal: {
                color: "#121847",
                borderWidth: 0,
                shadowBlur: {
                  shadowColor: "rgba(255,255,255,0.31)",
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowOffsetY: 2
                }
              }
            },
            barWidth: "30%",
            data: [30, 30, 30, 30, 30, 30, 30, 30]
          }
        ]
      };
      option && myChart.setOption(option);
      window.addEventListener("resize", function() {
        myChart.resize();
      });
    },
    onSwiper(swiper) {
      console.log(swiper);
    },
    onSlideChange() {
      console.log("slide change");
    },
    clickHandler(e) {
      alert(`单击点的坐标为：${e.point.lng}, ${e.point.lat}`);
    },
    addPoints() {
      const points = [];
      for (var i = 0; i < 1000; i++) {
        const position = {
          lng: Math.random() * 40 + 85,
          lat: Math.random() * 30 + 21
        };
        points.push(position);
      }
      this.points = points;
    },

    addMarker(point, i) {
      if (i.status == "离线") {
        var myIcon = new BMap.Icon(
          require("@/assets/img/定位红.png"),
          new BMap.Size(50, 50)
        );
      }
      if (i.status == "在线") {
        var myIcon = new BMap.Icon(
          require("@/assets/img/定位绿.png"),
          new BMap.Size(50, 50)
        );
      }

      var marker = new BMap.Marker(point, {
        icon: myIcon
      });
      var labelopts = {
        position: point, // 指定文本标注所在的地理位置
        offset: new BMap.Size(-30, -30) // 设置文本偏移量
      };
      var label = new BMap.Label(i.title, labelopts);
      label.setStyle({
        color: "#181b40",
        fontSize: "14px",
        backgroundColor: "0.05",
        backgroundColor: "rgba(255,255,255,0.7)",
        border: "0",
        fontWeight: "bold"
      });
      this.map.addOverlay(marker);
      // this.map.addOverlay(label);
      return marker;
    },

    // 添加信息窗口
    addInfoWindow(marker, poi) {
      //pop弹窗标题
      // console.log(poi)
      var title =
        '<div style="font-weight:bold;color:#CE5521;font-size:18px；background:transparent !important;">' +
        "手环信息" +
        "</div>";
      //pop弹窗信息
      var html = [];
      // html.push(
      //   '<div style="font-weight:bold;color:#CE5521;font-size:12px； margin-top: 40px;">' +
      //     poi.title +
      //     "</div>"
      // );

      html.push(
        '<table cellspacing="0" style="table-layout:fixed;width:100%;font:12px arial,simsun,sans-serif; margin-top: 10px;background:transparent !important;"><tbody>'
      );
      html.push("<tr style = 'height: 25px;'>");
      html.push(
        '<td style="vertical-align:top;line-height:16px;width:38px;white-space:nowrap;word-break:keep-all">状态:</td>'
      );
      html.push(
        '<td style="vertical-align:top;line-height:18px;">' +
          poi.status +
          " </td>"
      );
      html.push("</tr>");
      html.push("<tr style = 'height: 25px;'>");
      html.push(
        '<td style="vertical-align:top;line-height:16px;width:38px;white-space:nowrap;word-break:keep-all">名称:</td>'
      );
      html.push(
        '<td style="vertical-align:top;line-height:18px;">' +
          poi.title +
          " </td>"
      );
      html.push("</tr>");
      html.push("<tr style = 'height: 25px;'>");
      html.push(
        '<td style="vertical-align:top;line-height:16px;width:38px;white-space:nowrap;word-break:keep-all">坐标:</td>'
      );
      html.push(
        '<td style="vertical-align:top;line-height:18px;">' +
          "(" +
          poi.point +
          ")" +
          " </td>"
      );
      html.push("</tr>");
      html.push("<tr style = 'height: 25px;'>");
      html.push(
        '<td style="vertical-align:top;line-height:16px;width:38px;white-space:nowrap;word-break:keep-all">地址:</td>'
      );
      html.push(
        '<td style="vertical-align:top;line-height:18px;">' +
          poi.address +
          " </td>"
      );
      html.push("</tr>");
      html.push("</tbody></table>");
      var infoWindow = new BMap.InfoWindow(html.join(""), {
        title: title,
        width: 200
      });

      var openInfoWinFun = function() {
        marker.openInfoWindow(infoWindow);
      };

      marker.addEventListener("click", openInfoWinFun);
      return openInfoWinFun;
    },
    logout() {
      this.$store.dispatch("user/logout");
      this.$router.push(`/login?redirect=${this.$route.fullPath}`);
    },
    reset() {
      this.prepare();
    },
//     enterDetails(val) {
//       console.log(val);
//       window.sessionStorage.setItem("whichProduct", JSON.stringify(val));
//       // this.$router.push({ path: "/products/pageDetail" });
//       this.dialogVisible1 = true;
//     },
//     cancel() {
//  window.sessionStorage.setItem("whichProduct", JSON.stringify({}));
//   this.dialogVisible1 = false;
//     },
    startSearch1() {
      this.alertTitle = false;
    },
    inputChange1() {
      console.log(this.alertSearch);
      this.data1 = [];
      this.alertInfo.forEach(item => {
        if (
          item.productName
            .toLowerCase()
            .includes(this.alertSearch.toLowerCase())
        ) {
          this.data1.push(item);
        }
      });
    },
    change1() {
      this.alertTitle = true;
      this.data1 = this.alertInfo;
      this.alertSearch = ""
    },
    allProduct() {
      this.dialogVisible = true;
    }
  }
};
</script>
<style lang = "scss" scoped>
.layout {
  width: 100%;
  height: 100%;
  font-family: PingFangSC-Semibold, PingFang SC;
  background-color: #22284a;
  background-size: cover;
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
    width: 98%;
    height: calc(100vh - 110px);
    .upper {
      height: 58vh;
      width: 100%;
      .statistics {
        height: 27vh;
        width: 100%;
        margin: 10px 10px 20px 10px;
        border-radius: 8px;
        background-color: #181c41;
        .title {
          height: 30px;
          line-height: 30px;
          vertical-align: middle;
          padding-left: 15px;
          font-size: 16px;
          font-weight: 600;
          color: #03c2ec;
          text-align: left;
        }
      }
      .alert {
        height: 27vh;
        width: 100%;
        margin: 0px 10px 20px 10px;
        border-radius: 8px;
        background-color: #181c41;
        .title {
          height: 40px;
          line-height: 40px;
          vertical-align: middle;
          padding-left: 15px;
          font-size: 16px;
          font-weight: 600;
          color: #03c2ec;
          text-align: left;
          .input {
          width: 86%;
          margin-left: 2%;
          height: 40px;
          background-color: #00093e !important;
          color: #fff;
          border: 1px solid #001257;
          outline: none;
        }
        }
                   .bottom {
        height: 180px;
        width: 100%;
        .seamless-warp {
          height: 100%;
          width: 100%;
          overflow: auto;

        }
        .cardList {
          height: 80px;
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
      #mapBody1 {
        border-radius: 30px;
        width: 100%;
        height: 56vh;
        margin: 10px 10px 20px 10px;

        /* background-color: #5a68df; */
      }
      .ringMessage {
        width: 103%;
        height: 56vh;
        margin: 10px 10px 20px 10px;

        background-color: #181c41;
        .title {
          height: 40px;
          line-height: 40px;
          vertical-align: middle;
          padding-left: 15px;
          font-size: 16px;
          font-weight: 600;
          color: #03c2ec;
          text-align: left;
        }
        .content {
          height: calc(100% - 40px);
          width: 100%;
          .index0 {
            width: 20px;
            height: 20px;
            line-height: 18px;
            vertical-align: middle;
            border-radius: 10px;
            display: block;
            text-align: center;
            color: #e60012;
            border: 1px solid #e60012;
            font-size: 10px;
          }
          .index1 {
            position: absolute;
            top: calc(45% + 50px);
            width: 20px;
            height: 20px;
            line-height: 18px;
            vertical-align: middle;
            border-radius: 10px;
            display: block;
            text-align: center;
            color: #e8bc25;
            border: 1px solid #e8bc25;
            font-size: 10px;
          }

          /* background-color: rgb(146, 72, 72); */
          .card {
            height: 60px;
            line-height: 30px;
            margin-left: 5px;
            margin-right: 5px;
            vertical-align: middle;
            text-align: center;
            color: #fff;
            background: #22284a;
            border-radius: 6px;
          }
          .divider {
            width: 80%;
            margin-left: 10%;
            height: 2px;
            padding: 0;
            margin: 0;
            font-family: "Kosugi Maru", sans-serif;
            background-image: linear-gradient(
              45deg,
              /* rgb(24, 27, 64) */ rgb(47, 56, 93),
              rgb(101, 120, 156),
              rgb(101, 120, 156),
              rgb(47, 56, 93),
              /* rgb(24, 27, 64) */
            );
          }
        }
      }
    }
    .downer {
      margin-top: -6px;
      .ranking {
        height: 30vh;
        width: 100%;
        margin: 0px 10px 20px 10px;
        border-radius: 8px;
        background-color: #181c41;
        .title {
          height: 40px;
          line-height: 40px;
          vertical-align: middle;
          padding-left: 15px;
          font-size: 16px;
          font-weight: 600;
          color: #03c2ec;
          text-align: left;
        }
        #ranking {
          height: calc(100% - 40px);
          width: 100%;
          z-index: 10;
          background: url("../img/footer-bg.png") no-repeat center center;
        }
      }
      .alertToday {
        height: 30vh;
        width: 100%;
        margin: 0px 10px 20px 10px;
        border-radius: 8px;
        background-color: #181c41;
        .title {
          height: 40px;
          line-height: 40px;
          vertical-align: middle;
          padding-left: 15px;
          font-size: 16px;
          font-weight: 600;
          color: #03c2ec;
          text-align: left;
        }
        .body {
          height: 100px;
          width: 100%;
          background-color: #fff;
          background: url("../img/footer-bg.png") no-repeat center center;
          .seamless-warp {
            height: 100%;
            width: 100%;
            overflow: hidden;
          }
          .cardList {
            height: 100px;
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
      .statistics {
        height: 30vh;
        width: 102%;
        margin: 0px 10px 20px 10px;
        border-radius: 8px;
        background-color: #181c41;
        .title {
          height: 40px;
          line-height: 40px;
          vertical-align: middle;
          padding-left: 15px;
          font-size: 16px;
          font-weight: 600;
          color: #03c2ec;
          text-align: left;
        }
        #heartRate {
          height: calc(100% - 40px);
          width: 100%;
          z-index: 10;
          background: url("../img/footer-bg.png") no-repeat center center;
        }
      }
    }
  }
}
               ::-webkit-scrollbar {
            width: 6px;
            height: 1px;
          }
          ::-webkit-scrollbar-thumb {
            border-radius: 10px;
            box-shadow: inset 0 0 5px rgba(97, 184, 179, 0.1);
            background: #78b4b4;
          }
          ::-webkit-scrollbar-track {
            box-shadow: inset 0 0 5px rgba(87, 175, 187, 0.1);
            border-radius: 10px;
            background: #ededed;
          }
</style>