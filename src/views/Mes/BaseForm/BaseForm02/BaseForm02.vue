<template>
  <section class="baseform02">
    <component-panel
      class="search-grid add-grid-desc"
      title="Receive 대기 List"
    >
      <div class="cond-wrap">
        <ul>
          <li class="item-list">
            <span class="item-label">Type</span>
            <span class="item-input">
              <b-radio name="radio">All</b-radio>
              <b-radio name="radio">Wafer</b-radio>
              <b-radio name="radio">Slung</b-radio>
            </span>
          </li>
          <li class="item-list">
            <span class="item-label">Find</span>
            <span class="item-input">
              <b-radio name="radio2">Ingot</b-radio>
              <b-radio name="radio2">Block</b-radio>
              <b-input /><b-button
                type="is-dark"
                icon-left="magnify"
              />
            </span>
          </li>
        </ul>
      </div>
      <div class="grid-wrap">
        <sk-grid
          ref="lotListGrid"
          style="width: 100%"
          :items-source="lotList"
          :initialized="initLotGrid"
          :use-checkbox="true"
          :columns="lotListColumns"
          @selection-changed="selectionChanged"
        />
        <span
          id="lotListGridDesc"
          class="grid-desc"
        >{{ lotListGridDescData }}</span>
      </div>
    </component-panel>
    <component-panel
      class="result-grid add-grid-desc"
    >
      <b-tabs>
        <b-tab-item label="Sample ">
          <div class="lot-search">
            <ul class="search-options">
              <li class="option-item">
                <span class="item-label">Ingot Lot</span>
                <span class="item-input"><b-input /></span>
              </li>
              <li class="option-item">
                <span class="item-label">Block Lot</span>
                <span class="item-input"><b-input /></span>
              </li>
              <li class="option-item">
                <span class="item-label">판정 MS</span>
                <span class="item-input"><b-input /></span>
              </li>
              <li class="option-item">
                <span class="item-label">Sample Type</span>
                <span class="item-input">
                  <b-radio name="radio3">All</b-radio>
                  <b-radio name="radio3">Wafer</b-radio>
                  <b-radio name="radio3">Slung</b-radio>
                </span>
              </li>
              <li class="option-item">
                <span class="item-label">
                  <b-checkbox>QC 도착 여부</b-checkbox>
                </span>
                <span class="item-input">
                  <b-datepicker
                    placeholder="from"
                    icon="calendar-today"
                    v-model="from"
                    editable
                  />
                  <span class="unit">~</span>
                  <b-datepicker
                    placeholder="to"
                    icon="calendar-today"
                    v-model="to"
                    editable
                  />
                </span>
              </li>
              <li class="option-item">
                <span class="item-label">
                  <b-checkbox>A/R 판정 여부</b-checkbox>
                </span>
                <span class="item-input">
                  <b-datepicker
                    placeholder="from"
                    icon="calendar-today"
                    v-model="from"
                    editable
                  />
                  <span class="unit">~</span>
                  <b-datepicker
                    placeholder="to"
                    icon="calendar-today"
                    v-model="to"
                    editable
                  />
                </span>
              </li>
            </ul>
          </div>
          <div class="grid-wrap">
            <sk-grid
              ref="lotListGrid"
              style="width: 100%"
              :items-source="lotList"
              :initialized="initLotGrid"
              :use-checkbox="true"
              :columns="lotListColumns"
              @selection-changed="selectionChanged"
            />
            <span
              id="lotListGridDesc"
              class="grid-desc"
            >{{ lotListGridDescData }}</span>
          </div>
        </b-tab-item>
        <b-tab-item label="비정규">
          <div class="lot-search">
            <ul class="search-options">
              <li class="option-item">
                <span class="item-label">Ingot Lot</span>
                <span class="item-input"><b-input /></span>
              </li>
              <li class="option-item">
                <span class="item-label">Block Lot</span>
                <span class="item-input"><b-input /></span>
              </li>
              <li class="option-item">
                <span class="item-label">판정 MS</span>
                <span class="item-input"><b-input /></span>
              </li>
              <li class="option-item">
                <span class="item-label">Sample Type</span>
                <span class="item-input">
                  <b-radio name="radio4">All</b-radio>
                  <b-radio name="radio4">Wafer</b-radio>
                  <b-radio name="radio4">Slung</b-radio>
                </span>
              </li>
              <li class="option-item">
                <span class="item-label">
                  <b-checkbox>QC 도착 여부</b-checkbox>
                </span>
                <span class="item-input">
                  <b-datepicker
                    placeholder="from"
                    icon="calendar-today"
                    v-model="from"
                    editable
                  />
                  <span class="unit">~</span>
                  <b-datepicker
                    placeholder="to"
                    icon="calendar-today"
                    v-model="to"
                    editable
                  />
                </span>
              </li>
              <li class="option-item">
                <span class="item-label">
                  <b-checkbox>A/R 판정 여부</b-checkbox>
                </span>
                <span class="item-input">
                  <b-datepicker
                    placeholder="from"
                    icon="calendar-today"
                    v-model="from"
                    editable
                  />
                  <span class="unit">~</span>
                  <b-datepicker
                    placeholder="to"
                    icon="calendar-today"
                    v-model="to"
                    editable
                  />
                </span>
              </li>
            </ul>
          </div>
          <div class="grid-wrap">
            <sk-grid
              ref="lotListGrid"
              style="width: 100%"
              :items-source="lotList"
              :initialized="initLotGrid"
              :use-checkbox="true"
              :columns="lotListColumns"
              @selection-changed="selectionChanged"
            />
            <span
              id="lotListGridDesc"
              class="grid-desc"
            >{{ lotListGridDescData }}</span>
          </div>
        </b-tab-item>
        <b-tab-item label="Sample 조회">
          <div class="lot-search">
            <ul class="search-options">
              <li class="option-item">
                <span class="item-label">Ingot Lot</span>
                <span class="item-input"><b-input /></span>
              </li>
              <li class="option-item">
                <span class="item-label">Block Lot</span>
                <span class="item-input"><b-input /></span>
              </li>
              <li class="option-item">
                <span class="item-label">판정 MS</span>
                <span class="item-input"><b-input /></span>
              </li>
              <li class="option-item">
                <span class="item-label">Sample Type</span>
                <span class="item-input">
                  <b-radio name="radio5">All</b-radio>
                  <b-radio name="radio5">Wafer</b-radio>
                  <b-radio name="radio5">Slung</b-radio>
                </span>
              </li>
              <li class="option-item">
                <span class="item-label">
                  <b-checkbox>QC 도착 여부</b-checkbox>
                </span>
                <span class="item-input">
                  <b-datepicker
                    placeholder="from"
                    icon="calendar-today"
                    v-model="from"
                    editable
                  />
                  <span class="unit">~</span>
                  <b-datepicker
                    placeholder="to"
                    icon="calendar-today"
                    v-model="to"
                    editable
                  />
                </span>
              </li>
              <li class="option-item">
                <span class="item-label">
                  <b-checkbox>A/R 판정 여부</b-checkbox>
                </span>
                <span class="item-input">
                  <b-datepicker
                    placeholder="from"
                    icon="calendar-today"
                    v-model="from"
                    editable
                  />
                  <span class="unit">~</span>
                  <b-datepicker
                    placeholder="to"
                    icon="calendar-today"
                    v-model="to"
                    editable
                  />
                </span>
              </li>
            </ul>
          </div>
          <div class="grid-wrap">
            <sk-grid
              ref="lotListGrid"
              style="width: 100%"
              :items-source="lotList"
              :initialized="initLotGrid"
              :use-checkbox="true"
              :columns="lotListColumns"
              @selection-changed="selectionChanged"
            />
            <span
              id="lotListGridDesc"
              class="grid-desc"
            >{{ lotListGridDescData }}</span>
          </div>
        </b-tab-item>
      </b-tabs>
    </component-panel>
  </section>
</template>
<script src="./BaseForm02.script.js" />
<style src="./BaseForm02.scss" lang="scss" />
