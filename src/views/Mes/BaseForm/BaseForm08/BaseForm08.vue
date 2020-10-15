<template>
  <section class="baseform08">
    <component-panel 
      class="search-grid add-grid-desc"
      title="GFA 대기 List"  
    >
      <div class="cond-wrap">
        <ul>
          <li class="item-list">
            <span class="item-label">검색조건</span>
            <ul class="item-input">
              <li>
                <span class="input-label">MS Code</span> 
                <b-input />
              </li>
              <li>
                <span class="input-label">Lot</span> 
                <b-input />
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div class="grid-wrap add-grid-desc">
        <sk-grid
          ref="lotListGrid"
          style="width: 100%"
          :items-source="lotList"
          :initialized="initLotGrid"
          :use-checkbox="true"
          :columns="lotListColumns"
          @selection-changed="selectionChanged"
        />
        <span class="grid-desc">99건 조회 되었습니다.</span>
      </div>
      <div class="detail-area">
        <ul class="info-num">
          <li>
            <span class="item-label">Lot Count :</span>
            <span class="item-input">0</span>
          </li>
          <li>
            <span class="item-label">Length :</span>
            <span class="item-input">0</span> 
          </li>
        </ul>
        <ul class="icon-area">
           <li class="proc">
            <b-icon 
              icon="check"
            />
            <span class="icon-label">Profile 조회</span>
          </li>
          <li class="proc">
            <b-icon 
              icon="atom-variant"
            />
            <span class="icon-label">변경 정보확인</span>
          </li>
        </ul>
      </div>
    </component-panel>
    <section class="result-grid">
      <component-panel 
        class="data-top-grid add-grid-desc"
        :use-header="false"
      >
        <b-tabs>
          <b-tab-item label="GFA 재샘플">
            <div class="lot-search">
              <span class="grid-title">Lot 정보</span>
              <ul class="search-options">
                <li class="option-item">
                  <span class="item-label">Lot Number</span>
                  <span class="item-input">
                    <b-input />
                  </span>
                </li>
                <li class="option-item">
                  <span class="item-label">Plant</span>
                  <span class="item-input">
                    <b-input />
                  </span>
                </li>
                <li class="option-item">
                  <span class="item-label">MS Code</span>
                  <span class="item-input">
                    <b-input />
                  </span>
                </li>
                <li class="option-item">
                  <span class="item-label">수량</span>
                  <span class="item-input">
                    <b-input />
                  </span>
                </li>
                <li class="option-item">
                  <span class="item-label">작업자</span>
                  <span class="item-input">
                    <b-input />
                  </span>
                </li>
                <li class="option-item">
                  <span class="item-label">UCL/LCL</span>
                  <span class="item-input sm">
                    <b-input />
                    <span class="unit">/</span>
                    <b-input />
                  </span>
                </li>
                <li class="option-item">
                  <span class="item-label">Y축 Max/Min</span>
                  <span class="item-input sm">
                    <b-input />
                    <span class="unit">/</span>
                    <b-input />
                  </span>
                </li>
                <li class="option-item">
                  <b-button
                    type="is-dark"
                    icon-left="refresh"
                  >
                    Chart Refresh
                  </b-button>
                </li>
              </ul>
            </div>
            <div class="data-grid">
              <span class="grid-title">변경 전 SUB MS 정보</span>
              <component-panel 
                class="chart-wrap">
                <sk-chart
                  :items-source="chartData"
                  binding-x-type="NUMBER"
                  binding-x="order"
                  chart-type="Line"
                >
                  <wj-flex-chart-series
                    binding="value"
                    name="SeriesName"
                  />
                </sk-chart>
              </component-panel>
              <component-panel class="grid-wrap add-grid-desc">
                <sk-grid
                  ref="lotListGrid"
                  style="width: 100%"
                  :items-source="lotList"
                  :initialized="initLotGrid"
                  :columns="lotListColumns"
                  @selection-changed="selectionChanged"
                />
                <span class="grid-desc">99건 조회 되었습니다.</span>
              </component-panel>
            </div>
          </b-tab-item>
          <b-tab-item label="Block 확정">

          </b-tab-item>
        </b-tabs>
      </component-panel>
      <component-panel 
        class="data-btm-grid"
        :use-header="false"
      >
        <b-tabs>
          <b-tab-item label="변경 정보">
            <div class="ms-info-area">
              <span class="grid-title">SUB MS 정보</span>
              <div class="info-wrap">
                <ul class="info-list">
                  <li class="option-item">
                    <span class="item-label">SUB MS</span>
                    <span class="item-input">
                      <b-input />
                    </span>
                  </li>
                  <li class="option-item">
                    <span class="item-label">Start Pos</span>
                    <span class="item-input">
                      <b-input />
                    </span>
                  </li>
                  <li class="option-item">
                    <span class="item-label">End Pos</span>
                    <span class="item-input">
                      <b-input />
                    </span>
                  </li>
                </ul>
                <div class="btn-list">
                  <b-button
                    type="is-dark"
                  > 동일 위치
                  </b-button>
                  <b-button
                    type="is-dark"
                  > Spec 확인
                  </b-button>
                  <b-button
                    type="is-dark"
                  > 위치 삭제
                  </b-button>
                </div> 
              </div>
              <component-panel
                class="grid-wrap add-grid-desc"
              >
                <sk-grid
                  ref="lotListGrid"
                  style="width: 100%"
                  :items-source="lotList"
                  :initialized="initLotGrid"
                  :columns="lotListColumns"
                  @selection-changed="selectionChanged"
                />
                <span class="grid-desc">99건 조회 되었습니다.</span>
              </component-panel>
            </div>
            <div class="sample-info-area">
              <span class="grid-title">정규 Sample 정보</span>
              <ul class="info-list">
                <li class="option-item">
                  <span class="item-label">Sample Position</span>
                  <span class="item-input">
                    <b-input />
                  </span>
                </li>
                <li class="option-item">
                  <span class="item-label">Sample 간격(mm)</span>
                  <span class="item-input">
                    <b-input />
                  </span>
                </li>
              </ul>
              <component-panel
                class="grid-wrap add-grid-desc"
              >
                <sk-grid
                  ref="lotListGrid"
                  style="width: 100%"
                  :items-source="lotList"
                  :initialized="initLotGrid"
                  :columns="lotListColumns"
                  @selection-changed="selectionChanged"
                />
                <span class="grid-desc">99건 조회 되었습니다.</span>
              </component-panel>
            </div>
            <div class="opt-area">
              <component-panel
                class="grid-wrap add-grid-desc"
              >
                <sk-grid
                  ref="lotListGrid"
                  style="width: 100%"
                  :items-source="lotList"
                  :initialized="initLotGrid"
                  :use-checkbox="true"
                  :columns="lotListColumns"
                  @selection-changed="selectionChanged"
                />
                <span class="grid-desc">99건 조회 되었습니다.</span>
              </component-panel>
              <div class="btn-list">
                <b-button
                  type="is-dark"
                > 동일 위치
                </b-button>
                <b-button
                  type="is-dark"
                > 자동샘플
                </b-button>
                <b-button
                  type="is-dark"
                > 위치 삭제
                </b-button>
                <b-button
                  type="is-dark"
                > 취소
                </b-button>
              </div> 
            </div>
          </b-tab-item>
          <b-tab-item label="엔지니어 샘플 & 샘플 Routine 변경">

          </b-tab-item>
           <b-tab-item label="변경 정보 확인">

          </b-tab-item>
        </b-tabs>
      </component-panel>
    </section>
  </section>
</template>
<script src="./BaseForm08.script.js" />
<style src="./BaseForm08.scss" lang="scss" />
